﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using OnePlace.BLL.Interfaces;
using OnePlace.BOL.AccoountPayload;

namespace webapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly IAccountService _accountService;

        public AccountController(IAccountService accountService)
        {
            _accountService = accountService;
        }

        [HttpPost("register")]
        [AllowAnonymous]
        public async Task<IActionResult> Register(RegisterPayload register)
        {
            var result = await _accountService.RegisterAsync(register);
            return Ok(result);
        }

        [HttpPost("login")]
        [AllowAnonymous]
        public async Task<IActionResult> Login(LoginPayload login)
        {
            var result = await _accountService.LoginAsync(login);
            return Ok(result);
        }

        [HttpPost("refresh")]
        [AllowAnonymous]
        public async Task<IActionResult> Refresh(string accessToken)
        {
            var result = await _accountService.RefreshToken(accessToken);
            return Ok(result);
        }

        [HttpPost("logout")]
        [Authorize]
        public async Task<IActionResult> Logout(string email)
        {
            await _accountService.LogoutAsync(email);
            return Ok();
        }

        [HttpPost("sendCode")]
        public async Task<IActionResult> SendCode(string emailAddress)
        {
            var result = _accountService.SendCode(emailAddress);
            return Ok(result);
        }
    }
}
