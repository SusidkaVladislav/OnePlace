
using Microsoft.AspNetCore.Identity;
using OnePlace.BOL.AccoountPayload;
using OnePlace.BOL.User;

namespace OnePlace.BLL.Interfaces
{
    public interface IAccountService
    {
        Task<UserDetails> RegisterAsync(RegisterPayload registerPayload);
        Task<SignInResult> LoginAsync(LoginPayload loginPayload);
        Task LogoutAsync();
    }
}