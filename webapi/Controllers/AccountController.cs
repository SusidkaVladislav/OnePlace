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
        public void  Register([FromBody] RegisterViewModel model)
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
                // add  user
                var result = _userManager.CreateAsync(user, model.Password);
                if (result.IsCompletedSuccessfully)
                {
                    // coockies
                    _signInManager.SignInAsync(user, false);
                    _userManager.AddToRoleAsync(user, "user");

                    var response = new
                    {
                        success = true,
                        data = user
                    };
                    Response.ContentType = "application/json";
                    Response.WriteAsync(JsonSerializer.Serialize(response));
                }
                else
                {
                    //foreach (var error in result.Errors)
                    //{
                    //    ModelState.AddModelError(string.Empty, error.Description);
                    //}
                    Response.StatusCode = (int)HttpStatusCode.BadRequest;
                    Response.WriteAsync("Response is failed");
                }
            }
            else
            {
                Response.StatusCode = (int)HttpStatusCode.BadRequest;
                Response.WriteAsync("Invalid input");
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
                        Response.StatusCode = (int)HttpStatusCode.BadRequest;
                        Response.WriteAsync("Login failed");
                    }
                }
                else
                {
                    Response.StatusCode = (int)HttpStatusCode.BadRequest;
                    Response.WriteAsync("User not found");
                }
            }
            else
            {
                Response.StatusCode = (int)HttpStatusCode.BadRequest;
                Response.WriteAsync("Invalid input");
            }
        }
    }
}
