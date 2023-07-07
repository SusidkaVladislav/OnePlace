using BLL.Interfaces;
using DTO.ManufactureCountry;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace webapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ManufactureCountryController : ControllerBase
    {
        private readonly IManufactureCountryService _manufactureCountryService;
        public ManufactureCountryController(IManufactureCountryService manufactureCountryService)
        {
            _manufactureCountryService = manufactureCountryService;
        }

        [HttpGet]
        public async Task<ActionResult<List<ManufactureCountryDTO>>> GetManufactureCountries()
        {
            try
            {
                return Ok(await _manufactureCountryService.GetManufactureCountriesAsync());
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ManufactureCountryDTO>> GetManufactureCountriy(long id)
        {
            try
            {
                return Ok(await _manufactureCountryService.GetManufactureCountryByIdAsync(id));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        public async Task<ActionResult<ManufactureCountryDTO>> AddManufactureCountriy(ManufactureCountryToAddDTO manufactureCountryToAddDTO)
        {
            try
            {
                return Ok(await _manufactureCountryService.AddManufactureCountryAsync( manufactureCountryToAddDTO));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut]
        public async Task<ActionResult<ManufactureCountryDTO>> UpdateManufactureCountriy(ManufactureCountryDTO manufactureCountryDTO)
        {
            try
            {
                return Ok(await _manufactureCountryService.UpdateManufactureCountryAsync(manufactureCountryDTO));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete]
        public async Task<ActionResult> DeleteManufactureCountriy(long id)
        {
            try
            {
                return Ok(/*await _manufactureCountryService.DeleteManufactureCountryAsync(id)*/);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

    }
}
