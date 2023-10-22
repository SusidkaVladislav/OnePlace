﻿
using Microsoft.AspNetCore.Identity;
using OnePlace.BOL.AccoountPayload;
using OnePlace.BOL.User;

namespace OnePlace.BLL.Interfaces
{
    public interface IAccountService
    {
        Task<IdentityResult> RegisterAsync(RegisterPayload registerPayload);
        Task<string> LoginAsync(LoginPayload loginPayload);
        Task LogoutAsync();
    }
}