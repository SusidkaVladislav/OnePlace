using BLL.Interfaces;
using DTO.Manufacturer;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace webapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ManufacturerController : ControllerBase
    {
        private readonly IManufacturerService _manufacturerService;
        public ManufacturerController(IManufacturerService manufacturerService)
        {
            _manufacturerService = manufacturerService;
        }

        [HttpGet]
        public async Task<ActionResult<List<ManufacturerDTO>>> GetManufacturers()
        {
            try
            {
                return Ok(await _manufacturerService.GetManufacturersAsync());
            }
            catch(Exception ex) 
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ManufacturerDTO>> GetManufacturer(long id)
        {
            try
            {
                return Ok(await _manufacturerService.GetManufacturerByIdAsync(id));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        public async Task<ActionResult<ManufacturerDTO>> AddManufacturer(ManufacturerToAddDTO manufacturerToAddDTO)
        {
            try
            {
                return Ok(await _manufacturerService.AddManufacturerAsync(manufacturerToAddDTO));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut]
        public async Task<ActionResult<ManufacturerDTO>> UpdateManufacturer(ManufacturerDTO manufacturerDTO)
        {
            try
            {
                return Ok(await _manufacturerService.UpdateManufacturerAsync(manufacturerDTO));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete]
        public async Task<ActionResult> DeleteManufacturer(long id)
        {
            try
            {
                return Ok(/*await _manufacturerService.DeleteManufacturerAsync(id)*/);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
