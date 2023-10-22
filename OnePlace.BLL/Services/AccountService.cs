using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using OnePlace.BLL.Interfaces;
using OnePlace.BLL.Validators;
using OnePlace.BOL.AccoountPayload;
using OnePlace.BOL.Exceptions;
using OnePlace.BOL.User;
using OnePlace.DAL.Entities;
using OnePlace.DAL.Entities.ViewModels;
using System.IdentityModel.Tokens.Jwt;
using System.Reflection.Metadata.Ecma335;
using System.Security.Claims;
using System.Text;

namespace OnePlace.BLL.Services
{
    public class AccountService : IAccountService
    {
        private readonly IMapper _mapper;
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly IConfiguration _configuration;
        private const string USER_ROLE = "user";

        public AccountService(IMapper mapper, 
            UserManager<User> userManager,
            SignInManager<User> signInManager,
            IConfiguration configuration)
        {
            _mapper = mapper;
            _userManager = userManager;
            _signInManager = signInManager;
            _configuration = configuration;
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
                UserName = registerDTO.Email
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

            if (result.Succeeded)
            {
                //// coockies
                //await _signInManager.SignInAsync(user, false);
                await _userManager.AddToRoleAsync(user, USER_ROLE);
            }
            return result;
        }

        public async Task<string> LoginAsync(LoginPayload loginPayload)
        {
            var login = _mapper.Map<LoginDTO>(loginPayload);

            if(string.IsNullOrEmpty(login.Email))
                throw new ArgumentNullException(nameof(login.Email) + " is null or empty");
            if (string.IsNullOrEmpty(login.Password))
                throw new ArgumentNullException(nameof(login.Password) + " is null or empty");

            SignInResult result = await _signInManager
                    .PasswordSignInAsync(login.Email, login.Password, login.RememberMe, lockoutOnFailure: false);

            if (result.Succeeded)
            {
                User user = _userManager.FindByEmailAsync(login.Email).Result;
                return GetToken(user);
            }
            else
                return null;
        }

        public async Task LogoutAsync()
        {
            await _signInManager.SignOutAsync();
        }

        public string GetToken(User user)
        {
            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, _configuration["Jwt:Subject"]),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(JwtRegisteredClaimNames.Iat, DateTime.UtcNow.ToString()),
                new Claim("UserId", user.Id.ToString()),
                new Claim("Email", user.Email)
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
            var signIn = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var token = new JwtSecurityToken(
                _configuration["Jwt:Issuer"],
                _configuration["Jwt:Audience"],
                claims,
                expires: DateTime.UtcNow.AddHours(2),
                signingCredentials: signIn);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        //private string GenerateToken(int userId, string username)
        //{
        //    var claims = new[]
        //    {
        //        new Claim(ClaimTypes.NameIdentifier, userId.ToString()),
        //        new Claim(ClaimTypes.Name, username)
        //    };

        //    var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration.GetSection("AppSettings:Token").Value));

        //    var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

        //    var tokenDescriptor = new SecurityTokenDescriptor
        //    {
        //        Subject = new ClaimsIdentity(claims),
        //        Expires = DateTime.Now.AddDays(1),
        //        SigningCredentials = creds
        //    };

        //    var tokenHandler = new JwtSecurityTokenHandler();

        //    var token = tokenHandler.CreateToken(tokenDescriptor);

        //    return tokenHandler.WriteToken(token);
        //}
    }
}
