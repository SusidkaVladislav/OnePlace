using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using OnePlace.BLL.Interfaces;
using OnePlace.BLL.Validators;
using OnePlace.BOL.AccoountPayload;
using OnePlace.BOL.Exceptions;
using OnePlace.BOL.User;
using OnePlace.DAL.Entities;
using OnePlace.DAL.Entities.ViewModels;

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

            // add  user
            return await _userManager.CreateAsync(user, registerDTO.Password);

            //if (result.Succeeded)
            //{
            //    //// coockies
            //    //await _signInManager.SignInAsync(user, false);
            //    //await _userManager.AddToRoleAsync(user, USER_ROLE);
                
            //    //return new UserDetails
            //    //{
            //    //    Name = registerDTO.Name,
            //    //    Surname= registerDTO.Surname,
            //    //    PhoneNumber = registerDTO.PhoneNumber,
            //    //    Email = registerDTO.Email
            //    //};
            //}
            //else
            //{
            //    var r = result.Errors.Select(e=> e.Description);
            //    throw new Exception();
            //}
        }

        public async Task<SignInResult> LoginAsync(LoginPayload loginPayload)
        {
            var login = _mapper.Map<LoginDTO>(loginPayload);

            if(string.IsNullOrEmpty(login.Email))
                throw new ArgumentNullException(nameof(login.Email) + " is null or empty");
            if (string.IsNullOrEmpty(login.Password))
                throw new ArgumentNullException(nameof(login.Password) + " is null or empty");

            SignInResult result = await _signInManager
                    .PasswordSignInAsync(login.Email, login.Password, login.RememberMe, lockoutOnFailure: false);
            return result;
        }

        public async Task LogoutAsync()
        {
            await _signInManager.SignOutAsync();
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
