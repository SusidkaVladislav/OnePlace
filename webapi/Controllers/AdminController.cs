using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using OnePlace.DAL.Entities;

namespace webapi.Controllers
{
    public class AdminController : BaseApiController
    {
        private readonly UserManager<User> _userManager;
        public AdminController(UserManager<User> userManager)
        {
            _userManager = userManager;
        }

        [HttpGet]
        [Route("GetUsers")]
        public IEnumerable<User> GetUsers()
        {
            var allUsers = _userManager.Users.ToList();
            return allUsers;
        }
    }
}
