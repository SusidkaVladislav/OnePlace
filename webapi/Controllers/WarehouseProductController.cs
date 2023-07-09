using BLL.Interfaces;
using DTO.WarehouseProduct;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace webapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WarehouseProductController : ControllerBase
    {
        private readonly IWarehouseProductService _warehouseProductService;
        public WarehouseProductController(IWarehouseProductService warehouseProductService)
        {
            _warehouseProductService = warehouseProductService;
        }

        [HttpGet]
        public async Task<ActionResult<List<WarehouseProductDTO>>> GetWarehouseProducts()
        {
            try
            {
                return Ok(await _warehouseProductService.GetWarehouseProductsAsync());
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        //[HttpGet("{id}")]
        //public async Task<ActionResult<WarehouseProductDTO>> GetWarehouseProduct()
        //{
        //    try
        //    {
        //        return Ok(await _warehouseProductService.GetWarehouseProductsAsync());
        //    }
        //    catch (Exception ex)
        //    {
        //        return BadRequest(ex.Message);
        //    }
        //}
    }
}
