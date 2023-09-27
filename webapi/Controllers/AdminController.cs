using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using OnePlace.BLL.Interfaces;
using OnePlace.BLL.Services;
using OnePlace.BOL.Message;
using OnePlace.BOL.OrderPayload;
using OnePlace.BOL.Password;
using OnePlace.BOL.Picture;
using OnePlace.BOL.Review;
using OnePlace.BOL.ReviewReply;
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

        [HttpDelete("order/{id}")]
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

        [HttpDelete("message/{id}")]
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

        [HttpDelete("user/{id}")]
        //[Authorize(Roles = "admin")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var result = await _adminService.DeleteUser(id);
            return Ok(result);
        }

        [HttpGet("review")]
        //[Authorize(Roles = "admin")]
        public async Task<IActionResult> GetReviews()
        {
            var result = await _adminService.GetReviews();
            return Ok(result);
        }

        [HttpGet("review/{id}")]
        //[Authorize(Roles = "admin")]
        public async Task<IActionResult> GetReview(int id)
        {
            var result = await _adminService.GetReview(id);
            return Ok(result);
        }

        [HttpDelete("review/{id}")]
        //[Authorize(Roles = "admin")]
        public async Task<IActionResult> DeleteReview(int id)
        {
            var result = await _adminService.DeleteReview(id);
            return Ok(result);
        }

        [HttpGet("reviewReply")]
        //[Authorize(Roles = "admin")]
        public async Task<IActionResult> GetReviewReplies()
        {
            var result = await _adminService.GetReviewReplies();
            return Ok(result);
        }

        [HttpGet("reviewReply/{id}")]
        //[Authorize(Roles = "admin")]
        public async Task<IActionResult> GetReviewReply(int id)
        {
            var result = await _adminService.GetReviewReply(id);
            return Ok(result);
        }

        [HttpDelete("reviewReply")]
        //[Authorize(Roles = "admin")]
        public async Task<IActionResult> DeleteReviewReply(int id)
        {
            var result = await _adminService.DeleteReviewReply(id);
            return Ok(result);
        }

        [HttpPost("reviewReply")]
        //[Authorize(Roles = "admin")]
        public async Task<IActionResult> AddReviewReply(ReviewReplyPayload reviewReply)
        {
            var result = await _adminService.AddReviewReply(reviewReply);
            return Ok(result);
        }
    }
}
