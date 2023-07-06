using BLL.Interfaces;
using DTO.User;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace webapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet]
        public async Task<ActionResult<List<UserDTO>>> GetUsers()
        {
            try
            {
                return Ok(await _userService.GetUsersAsync());
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<UserDTO>> GetUser(long id)
        {
            try
            {
                return Ok(await _userService.GetUserByIdAsync(id));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        public async Task<ActionResult<UserDTO>> AddUser(UserToAddDTO userToAddDTO)
        {
            try
            {
                return Ok(await _userService.AddUserAsync(userToAddDTO));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut]
        public async Task<ActionResult<UserDTO>> UpdateUser(UserDTO userDTO)
        {
            try
            {
                return Ok(await _userService.UpdateUserAsync(userDTO));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete]
        public async Task<ActionResult> DeleteUser(long id)
        {
            try
            {
                return Ok(/*await _userService.DeleteUserAsync(id)*/);
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
