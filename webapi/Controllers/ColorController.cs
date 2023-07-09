using BLL.Interfaces;
using DTO.Color;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace webapi.Controllers
{
    [Route("api/color")]
    [ApiController]
    public class ColorController : ControllerBase
    {
        private readonly IColorService _colorService;
        public ColorController(IColorService colorService)
        {
            _colorService = colorService;
        }

        [HttpGet]
        public async Task<ActionResult<List<ColorDTO>>> GetColors()
        {
            try
            {
                return Ok(await _colorService.GetColorsAsync());
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ColorDTO>> GetColor(long id)
        {
            try
            {
                return Ok(await _colorService.GetColorByIdAsync(id));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        public async Task<ActionResult<ColorDTO>> AddColor(ColorToAddDTO colorToAddDTO)
        {
            try
            {
                return Ok(await _colorService.AddColorAsync(colorToAddDTO));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut]
        public async Task<ActionResult<ColorDTO>> UpdateColor(ColorDTO colorDTO)
        {
            try
            {
                return Ok(await _colorService.UpdateColorAsync(colorDTO));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete]
        public async Task<ActionResult> DeleteColor(long id)
        {
            try
            {
                return Ok(/*await _colorService.DeleteColorAsync(id)*/);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
