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

        [HttpGet]
        //[Authorize(Roles = "admin, user")]
        public async Task<IActionResult> GetProduct(int id)
        {
            var result = await _productService.GetProduct(id);
            return Ok(result);
        }

        [HttpPost("search")]
        //[Authorize(Roles = "admin, user")]
        public async Task<IActionResult> GetFilteredProducts([FromBody] ProductSearchParams filter)
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
        public async Task<IActionResult> UpdateProduct(ProductUpdatePayload product)
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
