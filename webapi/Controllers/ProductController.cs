using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OnePlace.BLL.Services;
using OnePlace.BLL.Utilities;
using OnePlace.BOL.ProductPayload;
using System.ComponentModel.DataAnnotations;

namespace webapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly ProductService _productService;
        public ProductController(ProductService productService)
        {
            _productService = productService;
        }

        [HttpGet]
        public async Task<IActionResult> GetProduct(int id)
        {
            try
            {
                var result = await _productService.GetProduct(id);
                return Ok(result);    
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("search")]
        public async Task<IActionResult> GetFilteredProducts([FromBody] ProductSearchParams filter)
        {
            try
            {
                var result = await _productService.FilterProduct(filter);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        public async Task<IActionResult> AddProduct(ProductCreatePayload product, int categoryId)
        {
            var result = await _productService.AddProduct(product, categoryId);
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
