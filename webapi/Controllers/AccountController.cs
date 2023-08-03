using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using OnePlace.DAL.Entities.ViewModels;
using OnePlace.DAL.Entities;

namespace webapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]5
    public class AccountController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        public AccountController(UserManager<User> userManager, SignInManager<User> signInManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
        }

        [HttpPost]
        public async Task<IActionResult> Register(Register register)
        {
            if (ModelState.IsValid)
            {
                User user = new User
                {
                    Name = register.Name,
                    Surname = register.Surname,
                    PhoneNumber = register.Phone_number,
                    Email = register.Email,
                    UserName = register.Email
                };
                // add  user
                var result = await _userManager.CreateAsync(user, register.Password);

                if (result.Succeeded)
                {
                    // coockies
                    await _signInManager.SignInAsync(user, false);
                    await _userManager.AddToRoleAsync(user, "user");
                    return Ok(result);
                }
                else
                {
                    foreach (var error in result.Errors)
                    {
                        //ModelState.AddModelError(string.Empty, error.Description);
                    }
                }
                return BadRequest();
            }
            return BadRequest();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Login(Login login, string? returnUrl)
        {
            returnUrl = returnUrl ?? Url.Content("~/Admin/Index");

            if (ModelState.IsValid)
            {
                var result =
                    await _signInManager.PasswordSignInAsync(login.Email, login.Password, login.RememberMe, lockoutOnFailure: false);
                if (result.Succeeded)
                {
                    if (!string.IsNullOrEmpty(returnUrl) && Url.IsLocalUrl(returnUrl))
                    {

                    }
                    else
                    {

                    }
                }
                else
                {
                    //ModelState.AddModelError(string.Empty, "Invalid login attempt.");
                }
            }
            return Ok();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Logout()
        {
            await _signInManager.SignOutAsync();
            return Ok();
        }
    }
}
