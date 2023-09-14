using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using OnePlace.BLL.Interfaces;
using OnePlace.BLL.Services;
using OnePlace.BOL.Message;
using OnePlace.BOL.OrderPayload;
using OnePlace.BOL.Password;
using OnePlace.BOL.Picture;
using OnePlace.BOL.Review;
using OnePlace.BOL.ShoppingCart;

namespace webapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly IAdminService _adminService;
        public AdminController(IAdminService adminService)
        {
            _adminService = adminService;
        }

        [HttpGet("order")]
        //[Authorize(Roles = "admin")]
        public async Task<IActionResult> GetOrders()
        {
            var result = await _adminService.GetOrders();
            return Ok(result);
        }

        [HttpPut("order")]
        //[Authorize(Roles = "admin")]
        public async Task<IActionResult> UpdateOrder(UpdateOrderPayload order)
        {
            var result = await _adminService.UpdateOrder(order);
            return Ok(result);
        }

        [HttpDelete("order")]
        //[Authorize(Roles = "admin")]
        public async Task<IActionResult> DeleteOrder(int id)
        {
            var result = await _adminService.DeleteOrder(id);
            return Ok(result);
        }

        [HttpGet("message")]
        //[Authorize(Roles = "admin")]
        public async Task<IActionResult> GetMessages()
        {
            var result = await _adminService.GetMessages();
            return Ok(result);
        }

        [HttpPut("message")]
        //[Authorize(Roles = "admin")]
        public async Task<IActionResult> UpdateMessage(UpdateMessagePayload message)
        {
            var result = await _adminService.UpdateMessage(message);
            return Ok(result);
        }

        [HttpDelete("message")]
        //[Authorize(Roles = "admin")]
        public async Task<IActionResult> DeleteMessage(int id)
        {
            var result = await _adminService.DeleteMessage(id);
            return Ok(result);
        }

        [HttpGet("user")]
        //[Authorize(Roles = "admin")]
        public async Task<IActionResult> GetUsers()
        {
            var result = await _adminService.GetUsers();
            return Ok(result);
        }

        [HttpDelete("user")]
        //[Authorize(Roles = "admin")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var result = await _adminService.DeleteUser(id);
            return Ok(result);
        }
      
    }
}
