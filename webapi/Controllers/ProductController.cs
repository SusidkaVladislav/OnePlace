using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OnePlace.BLL.Services;

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
    }
}
