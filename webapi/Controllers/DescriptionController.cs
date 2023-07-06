using BLL.Interfaces;
using DTO.Description;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace webapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DescriptionController : ControllerBase
    {
        private readonly IDescriptionService _descriptionService;

        public DescriptionController(IDescriptionService descriptionService)
        {
            _descriptionService = descriptionService;
        }

        [HttpGet]
        public async Task<ActionResult<List<DescriptionDTO>>> GetDescriptions()
        {
            try
            {
                return Ok(await _descriptionService.GetDescriptionsAsync());
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<DescriptionDTO>> GetDescription(long id)
        {
            try
            {
                return Ok(await _descriptionService.GetDescriptionByIdAsync(id));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        public async Task<ActionResult<DescriptionDTO>> AddDescription(DescriptionToAddDTO descriptionToAddDTO)
        {
            try
            {
                return Ok(await _descriptionService.AddDescriptionAsync(descriptionToAddDTO));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut]
        public async Task<ActionResult<DescriptionDTO>> UpdateDescription(DescriptionDTO descriptionDTO)
        {
            try
            {
                return Ok(await _descriptionService.UpdateDescriptionAsync(descriptionDTO));
            }
            catch (Exception ex) 
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete]
        public async Task<ActionResult> DeleteDescription(long id)
        {
            try
            {
                return Ok(/*await _descriptionService.DeleteDescriptionAsync(id)*/);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    
    }
}
