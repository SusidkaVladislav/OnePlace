using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using OnePlace.BLL.Interfaces;
using OnePlace.BOL.AccoountPayload;
using OnePlace.BOL.Message;
using OnePlace.BOL.Password;
using OnePlace.BOL.Picture;
using OnePlace.BOL.Review;
using OnePlace.BOL.ShoppingCart;

using System.Xml.Linq;

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

        [HttpPost("review")]
        //[Authorize(Roles = "user")]
        public async Task<IActionResult> CreateReview(CreateReviewPayload review)
        {
            var result = await _userService.CreateReview(review);
            return Ok(result);
        }

        [HttpDelete("review")]
        //[Authorize(Roles = "user")]
        public async Task<IActionResult> DeleteReview(int id)
        {
            var result = await _userService.DeleteReview(id);
            return Ok(result);
        }

        [HttpPost("shoppingCart")]
        [Authorize(Roles = "user")]
        public async Task<IActionResult> AddToCart(ShoppingCartPayload cart)
        {
            var result = await _userService.AddToCart(cart);
            return Ok(result);
        }

        [HttpDelete("shoppingCart")]
        [Authorize(Roles = "user")]
        public async Task<IActionResult> DeleteFromCart(ShoppingCartPayload cart)
        {
            var result = await _userService.DeleteFromCart(cart);
            return Ok(result);
        }

        [HttpPut("shoppingCart")]
        [Authorize(Roles = "user")]
        public async Task<IActionResult> UpdateCart(ShoppingCartPayload cart)
        {
            var result = await _userService.UpdateCart(cart);
            return Ok(result);
        }

        [HttpGet("shoppingCart")]
        [Authorize(Roles = "user")]
        public async Task<IActionResult> GetCart()
        {
            var result = await _userService.GetCart();
            return Ok(result);
        }

        [HttpPost("likedProduct")]
        //[Authorize(Roles = "user")]
        public async Task<IActionResult> AddLikedProduct(int id)
        {
            var result = await _userService.AddLikedProduct(id);
            return Ok(result);
        }

        [HttpDelete("likedProduct")]
        //[Authorize(Roles = "user")]
        public async Task<IActionResult> DeleteLikedProduct(int id)
        {
            var result = await _userService.DeleteLikedProduct(id);
            return Ok(result);
        }

        [HttpGet("likedProduct")]
        //[Authorize(Roles = "user")]
        public async Task<IActionResult> GetLikedProducts()
        {
            var result = await _userService.GetLikedProducts();
            return Ok(result);
        }

        [HttpPost("message")]
        [AllowAnonymous]
        public async Task<IActionResult> AddMessage(MessagePayload message)
        {
            var result = await _userService.AddMessage(message);
            return Ok(result);
        }

        [HttpGet("message")]
        //[Authorize(Roles = "user")]
        public async Task<IActionResult> GetMessages()
        {
            var result = await _userService.GetMessages();
            return Ok(result);
        }

        [HttpDelete("message")]
        //[Authorize(Roles = "user")]
        public async Task<IActionResult> DeleteMessage(int id)
        {
            var result = await _userService.DeleteMessage(id);
            return Ok(result);
        }

        [HttpPut("password")]
        //[Authorize(Roles = "user")]
        public async Task<IActionResult> UpdatePassword(PasswordUpdatePayload passwordUpdate)
        {
            var result = await _userService.UpdatePassword(passwordUpdate);
            return Ok(result);
        }

        [HttpPut("photo")]
        //[Authorize(Roles = "user")]
        public async Task<IActionResult> UpdatePhoto(UserPicturePayload pictureUpdate)
        {
            var result = await _userService.UpdatePhoto(pictureUpdate);
            return Ok(result);
        }

        [HttpGet("order")]
        //[Authorize(Roles = "user")]
        public async Task<IActionResult> GetOrders()
        {
            var result = await _userService.GetOrders();
            return Ok(result);
        }

        [HttpPost("getUserPersonalData")]
        [Authorize(Roles = "user")]
        public async Task<IActionResult> GetUserPersonalData()
        {
            var result = await _userService.GetUserPersonalData();
            return Ok(result);
        }
    }
}
