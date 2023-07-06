using BLL.Interfaces;
using DTO.ThirdLevelCategory;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace webapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ThirdLevelCategoryController : ControllerBase
    {
        private readonly IThirdLevelCategoryService _thirdLevelCategoryService;

        public ThirdLevelCategoryController(IThirdLevelCategoryService thirdLevelCategoryService)
        {
            _thirdLevelCategoryService = thirdLevelCategoryService;
        }

        [HttpGet]
        public async Task<ActionResult<List<ThirdLevelCategoryDTO>>> GetThirdLevelcategories()
        {
            try
            {
                return Ok(await _thirdLevelCategoryService.GetThirdLevelCategoriesAsync());
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ThirdLevelCategoryDTO>> GetThirdLevelCategory(long id)
        {
            try
            {
                return Ok(await _thirdLevelCategoryService.GetThirdLevelCategoryByIdAsync(id));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        public async Task<ActionResult<ThirdLevelCategoryDTO>> AddThirdlevelCategory(ThirdLevelCategoryToAddDTO thirdLevelCategoryToAddDTO)
        {
            try
            {
                return Ok(await _thirdLevelCategoryService.AddThirdLevelCategoryAsync(thirdLevelCategoryToAddDTO));
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut]
        public async Task<ActionResult<ThirdLevelCategoryDTO>> UpdateThirdLevelCategory(ThirdLevelCategoryDTO thirdLevelCategoryDTO)
        {
            try
            {
                return Ok(await _thirdLevelCategoryService.UpdateThirdLevelCategoryAsync(thirdLevelCategoryDTO));
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete]
        public async Task<ActionResult> DeleteThirdLevelCategory(long id)
        {
            try
            {
                return Ok(/*await _thirdLevelCategoryService.DeleteThirdLevelCategoryAsync(id)*/);
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    
    }
}
