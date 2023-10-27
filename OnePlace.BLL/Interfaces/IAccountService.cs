using Microsoft.AspNetCore.Identity;
using OnePlace.BOL.AccoountPayload;

namespace OnePlace.BLL.Interfaces
{
    public interface IAccountService
    {
        Task<IdentityResult> RegisterAsync(RegisterPayload registerPayload);
        Task<string> LoginAsync(LoginPayload loginPayload);
        Task<string> RefreshToken(string accessToken);
        Task LogoutAsync();
    }
}