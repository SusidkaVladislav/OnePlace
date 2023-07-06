using BLL.Interfaces;
using DTO.Picture;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace webapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PictureController : ControllerBase
    {
        private readonly IPictureService _pictureService;
        public PictureController(IPictureService pictureService)
        {
            _pictureService = pictureService;
        }

        [HttpGet]
        public async Task<ActionResult<List<PictureDTO>>> GetPictures()
        {
            try
            {
                return Ok(await _pictureService.GetPicturesAsync());
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<PictureDTO>> GetPicture(long id)
        {
            try
            {
                return Ok(await _pictureService.GetPictureByIdAsync(id));
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        public async Task<ActionResult<PictureDTO>> AddPicture(PictureToAdd pictureToAdd)
        {
            try
            {
                return Ok(await _pictureService.AddPictureAsync(pictureToAdd));
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut]
        public async Task<ActionResult<PictureDTO>> UpdatePicture(PictureDTO pictureDTO)
        {
            try
            {
                return Ok(await _pictureService.UpdatePictureAsync(pictureDTO));
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete]
        public async Task<ActionResult> DeletePicture(long id)
        {
            try
            {
                return Ok(/*await _pictureService.DeletePictureAsync(id)*/);
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
