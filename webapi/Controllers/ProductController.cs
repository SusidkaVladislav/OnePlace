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

        [HttpGet]
        public async Task<IActionResult> GetProduct(int id)
        {
            var result = await _productService.GetProduct(id);
            return Ok(result);
        }

        [HttpGet("search")]
        public async Task<IActionResult> GetFilteredProducts([FromQuery] ProductSearchParams filter)
        {
            var result = await _productService.FilterProduct(filter);
            return Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult> AddProduct(ProductCreatePayload product)
        {
            var result = await _productService.AddProduct(product);
            return Ok(result);
        }

        [HttpPut]
        public async Task<IActionResult> UpdateProduct(ProductPayload product)
        {
            var result = await _productService.UpdateProduct(product);
            return Ok(result);
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            var result = await _productService.DeleteProduct(id);
            return Ok(result);
        }
    }
}
