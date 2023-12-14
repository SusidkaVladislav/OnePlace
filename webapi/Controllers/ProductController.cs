using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using OnePlace.BLL.Interfaces;
using OnePlace.BLL.Utilities;
using OnePlace.BOL.ProductPayload;

namespace webapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly IProductService _productService;
        public ProductController(IProductService productService)
        {
            _productService = productService;
        }

        [HttpGet("product/{id}")]
        public async Task<IActionResult> GetProduct(int id)
        {
            var result = await _productService.GetProduct(id);
            return Ok(result);
        }

        [HttpPost("search")]
        public async Task<IActionResult> GetFilteredProducts([FromBody] ProductSearchParams filter)
        {
            var result = await _productService.FilterProduct(filter);
            return Ok(result);
        }

        [HttpPost("addProduct")]
        [Authorize(Roles = "admin")]
        public async Task<IActionResult> AddProduct(ProductCreatePayload product)
        {
            var result = await _productService.AddProduct(product);
            return Ok(result);
        }

        [HttpPut("updateProduct")]
        [Authorize(Roles = "admin")]
        public async Task<IActionResult> UpdateProduct(ProductUpdatePayload product)
        {
            var result = await _productService.UpdateProduct(product);
            return Ok(result);
        }

        [HttpDelete("deleteProduct")]
        [Authorize(Roles = "admin")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            var result = await _productService.DeleteProduct(id);
            return Ok(result);
        }

        [HttpGet("getAllCount")]
        [Authorize(Roles = "admin")]
        public async Task<IActionResult> GetAllProductCount()
        {
            var result = await _productService.GetProductCount();
            return Ok(result);
        }

        [HttpGet("getAllProducts")]
        public async Task<IActionResult> GetAllProducts(int? categoryId = null)
        {
            var result = await _productService.GetAllProducts(categoryId);
            return Ok(result);
        }

        [HttpGet("getProductReviewsAnalitic/{id}")]
        public async Task<IActionResult> GetProductReviewsAnalitic(int id)
        {
            var result = await _productService.GetProductReviewsAnalitic(id);
            return Ok(result);
        }

        [HttpPost("getProductsFromCart")]
        public async Task<IActionResult> GetProductsFromCart(List<PayloadProductIdColorId> ids)
        {
            var result = await _productService.GetProductsFromCart(ids);
            return Ok(result);
        }
    }
}
