using Azure;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using OnePlace.DAL.Entities;
using OnePlace.DAL.Entities.ViewModels;
using System.Net;
using System.Text.Json;

namespace webapi.Controllers
{
    public class AccountController : BaseApiController
    {
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;

        public AccountController(UserManager<User> userManager, SignInManager<User> signInManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterViewModel model)
        {
            if (ModelState.IsValid)
            {
                User user = new User
                {
                    Name = model.Name,
                    Surname = model.Surname,
                    PhoneNumber = model.PhoneNumber,
                    Email = model.Email,
                    UserName = model.Email
                };

                var result = await _userManager.CreateAsync(user, model.Password);
                if (result.Succeeded)
                {
                    await _signInManager.SignInAsync(user, isPersistent: false);
                    await _userManager.AddToRoleAsync(user, "user");
                    var response = new
                    {
                        success = true,
                        data = user
                    };
                    return Ok(response);
                }
                else
                {
                    Response.StatusCode = 301;
                    return Content("Registration failed");
                }
            }
            else
            {
                Response.StatusCode = 311;
                return Content("Invalid input");
            }
        }

        [HttpPost("login")]
        public void LoginByEmail([FromBody] LoginViewModel model)
        {
            if (ModelState.IsValid)
            {
                var user = _userManager.FindByEmailAsync(model.Email).Result;
                if (user != null)
                {
                    var result = _signInManager.PasswordSignInAsync(user, model.Password, model.RememberMe, lockoutOnFailure: false).Result;
                    if (result.Succeeded)
                    {
                        var role = _userManager.GetRolesAsync(user).Result.FirstOrDefault();
                        if (role == "admin")
                        {
                            var userData = new User
                            {
                                Id = user.Id,
                                Name = user.Name,
                                Surname = user.Surname,
                                PhoneNumber = user.PhoneNumber,
                                Email = user.Email,
                                PasswordHash = user.PasswordHash
                            };
                            var response = new
                            {
                                success = true,
                                data = userData
                            };
                            Response.ContentType = "application/json";
                            Response.WriteAsync(JsonSerializer.Serialize(response));
                        }
                        else
                        {
                            Response.StatusCode = 421;
                            Response.WriteAsync("Access only for admins");
                        }
                    }
                    else
                    {
                        Response.StatusCode = 411;
                        Response.WriteAsync("Password failed");
                    }
                }
                else
                {
                    Response.StatusCode = 401;
                    Response.WriteAsync("User not found");
                }
            }
            else
            {
                Response.StatusCode = (int)HttpStatusCode.BadRequest;
                Response.WriteAsync("Invalid input");
            }
        }

        [HttpPost("changePassword")]
        public async Task<IActionResult> ChangePassword(ChangePasswordViewModel model)
        {
            if (ModelState.IsValid)
            {
                var user = await _userManager.FindByEmailAsync(model.Email);

                if (user != null)
                {
                    var token = await _userManager.GeneratePasswordResetTokenAsync(user);
                    var result = await _userManager.ResetPasswordAsync(user, token, model.Password);

                    if (result.Succeeded)
                    {
                        return Ok("Операція успішна");
                    }
                    else
                    {
                        return StatusCode(440, "Зміна паролю відмінена");
                    }
                }
                else
                {
                    return StatusCode(441, "Користувача не знайдено");
                }
            }
            else
            {
                return BadRequest("Invalid input"); // Use BadRequest to indicate a bad request with a message
            }
        }


    }
}
