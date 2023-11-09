using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using OnePlace.BLL.Interfaces;
using OnePlace.BOL;
using OnePlace.BOL.AdminPayload;
using OnePlace.BOL.Message;
using OnePlace.BOL.OrderPayload;
using OnePlace.BOL.ReviewReply;

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
        [Authorize(Roles = "admin")]
        public async Task<IActionResult> GetOrders()
        {
            var result = await _adminService.GetOrders();
            return Ok(result);
        }

        [HttpPut("order")]
        [Authorize(Roles = "admin")]
        public async Task<IActionResult> UpdateOrder(UpdateOrderPayload order)
        {
            var result = await _adminService.UpdateOrder(order);
            return Ok(result);
        }

        [HttpDelete("order/{id}")]
        [Authorize(Roles = "admin")]
        public async Task<IActionResult> DeleteOrder(int id)
        {
            var result = await _adminService.DeleteOrder(id);
            return Ok(result);
        }

        [HttpGet("message")]
        [Authorize(Roles = "admin")]
        public async Task<IActionResult> GetMessages()
        {
            var result = await _adminService.GetMessages();
            return Ok(result);
        }

        [HttpPut("message")]
        [Authorize(Roles = "admin")]
        public async Task<IActionResult> UpdateMessage(UpdateMessagePayload message)
        {
            var result = await _adminService.UpdateMessage(message);
            return Ok(result);
        }

        [HttpDelete("message/{id}")]
        [Authorize(Roles = "admin")]
        public async Task<IActionResult> DeleteMessage(int id)
        {
            var result = await _adminService.DeleteMessage(id);
            return Ok(result);
        }

        [HttpGet("user")]
        [Authorize(Roles = "admin")]
        public async Task<IActionResult> GetUsers()
        {
            var result = await _adminService.GetUsers();
            return Ok(result);
        }

        [HttpDelete("user/{id}")]
        [Authorize(Roles = "admin")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var result = await _adminService.DeleteUser(id);
            return Ok(result);
        }

        [HttpGet("review")]
        [Authorize(Roles = "admin")]
        public async Task<IActionResult> GetReviews()
        {
            var result = await _adminService.GetReviews();
            return Ok(result);
        }

        [HttpGet("review/{id}")]
        [Authorize(Roles = "admin")]
        public async Task<IActionResult> GetReview(int id)
        {
            var result = await _adminService.GetReview(id);
            return Ok(result);
        }

        [HttpDelete("review/{id}")]
        [Authorize(Roles = "admin")]
        public async Task<IActionResult> DeleteReview(int id)
        {
            var result = await _adminService.DeleteReview(id);
            return Ok(result);
        }

        [HttpGet("reviewReply")]
        [Authorize(Roles = "admin")]
        public async Task<IActionResult> GetReviewReplies()
        {
            var result = await _adminService.GetReviewReplies();
            return Ok(result);
        }

        [HttpGet("reviewReply/{id}")]
        [Authorize(Roles = "admin")]
        public async Task<IActionResult> GetReviewReply(int id)
        {
            var result = await _adminService.GetReviewReply(id);
            return Ok(result);
        }

        [HttpDelete("reviewReply")]
        [Authorize(Roles = "admin")]
        public async Task<IActionResult> DeleteReviewReply(int id)
        {
            var result = await _adminService.DeleteReviewReply(id);
            return Ok(result);
        }

        [HttpPost("reviewReply")]
        [Authorize(Roles = "admin")]
        public async Task<IActionResult> AddReviewReply(ReviewReplyPayload reviewReply)
        {
            var result = await _adminService.AddReviewReply(reviewReply);
            return Ok(result);
        }

        [HttpGet("getAllBrands")]
        public async Task<IActionResult> GetAllBrands()
        {
            var result = await _adminService.GetAllManufacturers();
            return Ok(result);
        }

        [HttpGet("getAllCountries")]
        public async Task<IActionResult> GetAllCountries()
        {
            var result = await _adminService.GetAllCountries();
            return Ok(result);
        }

        [HttpGet("getAllColors")]
        public async Task<IActionResult> GetAllColors()
        {
            var result = await _adminService.GetAllColors();
            return Ok(result);
        }
        
        [HttpGet("getDescriptionsByCategory")]    
        public async Task<IActionResult> GetDescriptionsByCategory(int categoryId)
        {
            var result = await _adminService.GetDescriptionsByCategoryId(categoryId);
            return Ok(result);
        }

        [HttpPost("createColor")]
        [Authorize(Roles = "admin")]
        public async Task<IActionResult> CreateColor(ColorToAdd color)
        {
            var result = await _adminService.CreateColor(color);
            return Ok(result);
        }

        [HttpDelete("deleteColor/{id}")]
        [Authorize(Roles = "admin")]
        public async Task<IActionResult> CreateColor(int id)
        {
            var result = await _adminService.DeleteColor(id);
            return Ok(result);
        }

        [HttpPut("updateColor")]
        [Authorize(Roles = "admin")]
        public async Task<IActionResult> UpdateColor(ColorDTO color)
        {
            var result = await _adminService.UpdateColor(color);
            return Ok(result);
        }

        [HttpPost("createCountry/{country}")]
        [Authorize(Roles = "admin")]
        public async Task<IActionResult> CreateCountry(string country)
        {
            var result = await _adminService.CreateCountry(country);
            return Ok(result);
        }

        [HttpDelete("deleteCountry/{id}")]
        [Authorize(Roles = "admin")]
        public async Task<IActionResult> DeleteCountry(int id)
        {
            var result = await _adminService.DeleteCountry(id);
            return Ok(result);
        }

        [HttpPut("updateCountry")]
        [Authorize(Roles = "admin")]
        public async Task<IActionResult> UpdateCountry(ManufacturerCountryDTO country)
        {
            var result = await _adminService.UpdateCountry(country);
            return Ok(result);
        }

        [HttpPost("createBrand/{brand}")]
        [Authorize(Roles = "admin")]
        public async Task<IActionResult> CreateBrand(string brand)
        {
            var result = await _adminService.CreateBrand(brand);
            return Ok(result);
        }

        [HttpDelete("deleteBrand/{id}")]
        [Authorize(Roles = "admin")]
        public async Task<IActionResult> DeleteBrand(int id)
        {
            var result = await _adminService.DeleteBrand(id);
            return Ok(result);
        }

        [HttpPut("updateBrand")]
        [Authorize(Roles = "admin")]
        public async Task<IActionResult> UpdateBrand(ManufacturerDTO brand)
        {
            var result = await _adminService.UpdateBrand(brand);
            return Ok(result);
        }

        [HttpPost("productSaleInfo")]
        [Authorize(Roles = "admin")]
        public async Task<IActionResult> GetProductSalingInfo(GetProductSaleStatisticPayload saleStatisticPayload)
        {
            var result = await _adminService.GetProductSalingInfo(saleStatisticPayload);
            return Ok(result);
        }


        [HttpGet("getUsersCount/{date}")]
        [Authorize(Roles = "admin")]
        public async Task<IActionResult> GetUsersCountByRegistrateDate(DateTime date)
        {
            var result = await _adminService.GetUsersCountByRegistrateDate(date);
            return Ok(result);
        }
    }
}
