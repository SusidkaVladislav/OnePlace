using BLL.Interfaces;
using DTO.FirstLevelCategory;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace webapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FirstLevelCategoryController : ControllerBase
    {
        private readonly IFirstLevelCategoryService _firstLevelCategoryService;

        public FirstLevelCategoryController(IFirstLevelCategoryService firstLevelCategoryService)
        {
            _firstLevelCategoryService = firstLevelCategoryService;
        }


        [HttpGet]
        public async Task<ActionResult<List<FirstLevelCategoryDTO>>> GetAllFirstLevelCategory() 
        {
            try
            {
                return Ok(await _firstLevelCategoryService.GetFirstLevelCategoriesAsync());
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<FirstLevelCategoryDTO>> GetFirstLevelCategory(long id)
        {
            try
            {
                return Ok(await _firstLevelCategoryService.GetFirstLevelCategoryByIdAsync(id));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        public async Task<ActionResult<FirstLevelCategoryDTO>> AddFirstLevelCategory(FirstLevelCategoryToAddDTO firstLevelCategoryToAddDTO)
        {
            try
            {
                return Ok(await _firstLevelCategoryService.AddFirstLevelCategoryAsync(firstLevelCategoryToAddDTO));
            }
            catch (Exception ex)
            { 
                return BadRequest(ex.Message);
            }
        }

        [HttpPut]
        public async Task<ActionResult<FirstLevelCategoryDTO>> UpdateFirstLevelCategory(FirstLevelCategoryDTO firstLevelCategoryDTO)
        {
            try
            {
                return Ok(await _firstLevelCategoryService.UpdateFirstLevelCategoryAsync(firstLevelCategoryDTO));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete]
        public async Task<ActionResult> DeleteFirstLevelCategory(long id)
        {
            try
            {
                return Ok(/*await _firstLevelCategoryService.DeleteFirstLevelCategoryAsync(id)*/);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
