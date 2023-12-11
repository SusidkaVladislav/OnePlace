using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OnePlace.BLL.Interfaces;

namespace webapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AnaliticController : ControllerBase
    {
        private readonly IAnaliticService _analiticService;
        public AnaliticController(IAnaliticService analiticService)
        {
            _analiticService = analiticService;
        }

        [HttpGet("getCategoryProductsInfo/{categoryId}")]
        public async Task<IActionResult> GetCategoryProductsInfo(int categoryId)
        {
           var result = await _analiticService.GetCategoryProductFilters(categoryId);
            return Ok(result);
        }

        [HttpGet("getProductReviews/{productId}")]
        public async Task<IActionResult> GetProductReviews(int productId)
        {
            var result = await _analiticService.GetProductReviews(productId);
            return Ok(result);
        }
    }
}
