using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using OnePlace.BLL.Interfaces;
using OnePlace.BLL.Validators;
using OnePlace.BOL.AccoountPayload;
using OnePlace.BOL.Exceptions;
using OnePlace.DAL.Entities;
using OnePlace.DAL.Entities.ViewModels;
using OnePlace.DAL.Interfaces;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace OnePlace.BLL.Services
{
    public class AccountService : IAccountService
    {
        private readonly IMapper _mapper;
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private IUnitOfWork _unitOfWork;
        private readonly IConfiguration _configuration;
        private IHttpContextAccessor _httpContextAccessor;
        private const string USER_ROLE = "user";

        public AccountService(IMapper mapper,
            UserManager<User> userManager,
            SignInManager<User> signInManager,
            IConfiguration configuration,
             IUnitOfWork unitOfWork,
            IHttpContextAccessor httpContextAccessor)
        {
            _mapper = mapper;
            _userManager = userManager;
            _signInManager = signInManager;
            _unitOfWork = unitOfWork;
            _configuration = configuration;
            _httpContextAccessor = httpContextAccessor;
        }

        public async Task<IdentityResult> RegisterAsync(RegisterPayload registerPayload)
        {
            RegisterDTO registerDTO = _mapper.Map<RegisterDTO>(registerPayload);
            UserValidation validation = new UserValidation(_userManager);

            User user = new User
            {
                Name = registerDTO.Name,
                Surname = registerDTO.Surname,
                PhoneNumber = registerDTO.PhoneNumber,
                Email = registerDTO.Email,
                UserName = registerDTO.Email,
                RegistrationDate = DateTime.Now,
            };

            // Валідація
            try
            {
                await validation.Validate(user);
            }
            catch (BusinessException ex)
            {
                throw ex;
            }

            var result = await _userManager.CreateAsync(user, registerDTO.Password);


            if (!result.Succeeded)
            {
                throw new BusinessException("Не вдалося зареєструвати користувача!");   
            }

            await _userManager.AddToRoleAsync(user, USER_ROLE);
            return result;
        }

        public async Task<string> LoginAsync(LoginPayload loginPayload)
        {
            var login = _mapper.Map<LoginDTO>(loginPayload);

            if (string.IsNullOrEmpty(login.Email))
                throw new ArgumentNullException(nameof(login.Email) + " is null or empty");
            if (string.IsNullOrEmpty(login.Password))
                throw new ArgumentNullException(nameof(login.Password) + " is null or empty");


            var user = await _userManager.FindByEmailAsync(login.Email);
            if (user != null && await _userManager.CheckPasswordAsync(user, login.Password))
            {
                var userRoles = await _userManager.GetRolesAsync(user);

                var authClaims = new List<Claim>
                {
                    new Claim(JwtRegisteredClaimNames.Sub, _configuration["Jwt:Subject"]),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                    new Claim(JwtRegisteredClaimNames.Iat, DateTime.UtcNow.ToString()),
                    new Claim(ClaimTypes.Name, user.Email),
                    new Claim("UserId", user.Id.ToString()),
                    new Claim("Email", user.Email),
                    new Claim("Role", userRoles.FirstOrDefault()),
                    new Claim(ClaimTypes.Role, userRoles.FirstOrDefault())
                };


                var token = GetToken(authClaims);
                var refreshToken = GenerateRefreshToken();

                _ = int.TryParse(_configuration["JWT:RefreshTokenValidityInDays"], out int refreshTokenValidityInDays);

                user.RefreshToken = refreshToken;
                user.RefreshTokenExpires = DateTime.Now.AddDays(refreshTokenValidityInDays);

                await _userManager.UpdateAsync(user);

                _ = int.TryParse(_configuration["JWT:RefreshTokenValidityInDays"], out int tokenValidityDays);


                CookieOptions cookie = new CookieOptions();
                cookie.HttpOnly = true;
                cookie.Secure = true;
                cookie.Path = "/";
                cookie.SameSite = SameSiteMode.None;
                cookie.Expires = DateTime.Now.AddDays(tokenValidityDays);
                

                _httpContextAccessor.HttpContext.Response.Cookies.Append("refresh-token", refreshToken, cookie);


                return new JwtSecurityTokenHandler().WriteToken(token);
            }

            throw new BusinessException("Не вірний пароль або пошта!");

        }

        private static string GenerateRefreshToken()
        {
            var randomNumber = new byte[64];
            using var rng = RandomNumberGenerator.Create();
            rng.GetBytes(randomNumber);
            return Convert.ToBase64String(randomNumber);
        }

        public async Task<string> RefreshToken(string accessToken)
        {
            if (accessToken is null)
            {
                throw new BusinessException("access-token error!");
            }
            
            if (!_httpContextAccessor.HttpContext.Request.Cookies.TryGetValue("refresh-token", out var refreshToken))
                throw new BusinessException("refresh-token error!");

            var principal = GetPrincipalFromExpiredToken(accessToken);

            if (principal == null)
            {
                throw new BusinessException("Токен не валідний!");
            }
            
            var userEmail = principal.Identity.Name;
            var user = await _userManager.FindByNameAsync(userEmail);

            if (user == null || user.RefreshToken != refreshToken || user.RefreshTokenExpires <= DateTime.Now)
            {
                throw new BusinessException("Невалідний токен!");
            }

            var newAccessToken = GetToken(principal.Claims.ToList());
            var newRefreshToken = GenerateRefreshToken();

            user.RefreshToken = newRefreshToken;
            await _userManager.UpdateAsync(user);

            CookieOptions cookie = new CookieOptions();
            cookie.HttpOnly = true;
            cookie.Secure = true;
            cookie.Path = "/";
            cookie.SameSite = SameSiteMode.None;
            _ = int.TryParse(_configuration["JWT:RefreshTokenValidityInDays"], out int tokenValidityDays);
            cookie.Expires = DateTime.Now.AddDays(tokenValidityDays);

            _httpContextAccessor.HttpContext.Response.Cookies.Append("refresh-token", newRefreshToken, cookie);

            try
            {
                var result = new JwtSecurityTokenHandler().WriteToken(newAccessToken);
                return result;
            }
            catch(SecurityTokenEncryptionFailedException ex)
            {
                throw ex;
            }
        }

        public async Task LogoutAsync(string email)
        {
            var user = await _userManager.FindByEmailAsync(email);
            
            if (user == null) 
                throw new BusinessException("Invalid user name");

            user.RefreshToken = null;
            await _userManager.UpdateAsync(user);

    
        }

        private ClaimsPrincipal? GetPrincipalFromExpiredToken(string? token)
        {
            var tokenValidationParameters = new TokenValidationParameters
            {
                ValidateAudience = false,
                ValidateIssuer = false,
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"])),
                ValidateLifetime = false
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            try
            {
                var principal = tokenHandler.ValidateToken(token, tokenValidationParameters, out SecurityToken securityToken);
                if (securityToken is not JwtSecurityToken jwtSecurityToken || !jwtSecurityToken.Header.Alg.Equals(SecurityAlgorithms.HmacSha256, StringComparison.InvariantCultureIgnoreCase))
                    throw new SecurityTokenException("Invalid token");

                return principal;
            }
            catch(Exception ex)
            {
                throw new BusinessException("Не валідний токен!");
            }
            
        }

        public JwtSecurityToken GetToken(List<Claim> claims)
        {
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
            _ = int.TryParse(_configuration["JWT:TokenValidityInMinutes"], out int tokenValidityInMinutes);

            var token = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Audience"],
                expires: DateTime.Now.AddMinutes(tokenValidityInMinutes),
                claims: claims,
                signingCredentials: new SigningCredentials(key, SecurityAlgorithms.HmacSha256)
                );

            return token;
        }
    }
}
