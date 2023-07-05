using BLL.Interfaces;
using DTO.Warehouse;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Runtime.CompilerServices;

namespace webapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WarehouseController : ControllerBase
    {
        private readonly IWarehouseService _warehouseService;

        public WarehouseController(IWarehouseService warehouseService)
        {
            _warehouseService = warehouseService;
        }


        [HttpGet]
        public async Task<ActionResult<List<WarehouseDTO>>> GetAllWarehousesAsync()
        {
            try
            {
                return Ok(await _warehouseService.GetWarehousesAsync());
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<WarehouseDTO>> GetWarehouseAsync(int id)
        {
            try
            {
                return Ok(await _warehouseService.GetWarehouseByIdAsync(id));
            }
            catch(Exception exception)
            {
                return BadRequest(exception.Message);
            }
        }

        [HttpPost]
        public async Task<ActionResult<WarehouseDTO>> AddWarehouseAsync(WarehouseDTO warehouseDTO)
        {
            try
            {
                return Ok(await _warehouseService.AddWarehouseAsync(warehouseDTO));
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}