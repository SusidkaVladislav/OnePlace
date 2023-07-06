using BLL.Interfaces;
using DTO.SecondLevelCategory;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace webapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SecondLevelCategoryController : ControllerBase
    {
        private readonly ISecondLevelCategoryService _secondLevelCategoryService;

        public SecondLevelCategoryController(ISecondLevelCategoryService secondLevelCategoryService)
        {
            _secondLevelCategoryService = secondLevelCategoryService;
        }


        [HttpGet]
        public async Task<ActionResult<List<SecondLevelCategoryDTO>>> GetSecondLevelcategories()
        {
            try
            {
                return Ok(await _secondLevelCategoryService.GetSecondLevelCategoriesAsync());
            }
            catch (Exception ex)
            { 
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<SecondLevelCategoryDTO>> GetSecondLevelCategory(long id)
        {
            try
            {
                return Ok(await _secondLevelCategoryService.GetSecondLevelCategoryByIdAsync(id));
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        public async Task<ActionResult<SecondLevelCategoryDTO>> AddsecondLevelCategory(SecondLevelCategoryToAddDTO secondLevelCategoryToAddDTO)
        {
            try
            {
                return Ok(await _secondLevelCategoryService.AddSecondLevelCategoryAsync(secondLevelCategoryToAddDTO));
            }
            catch (Exception ex) 
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut]
        public async Task<ActionResult<SecondLevelCategoryDTO>> UpdateSecondLevelCategory(SecondLevelCategoryDTO secondLevelCategory)
        {
            try
            {
                return Ok(await _secondLevelCategoryService.UpdateSecondLevelCategoryAsync(secondLevelCategory));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete]
        public async Task<ActionResult> DeleteSecondLevelcategory(long id)
        {
            try
            {
                return Ok(/*await _secondLevelCategoryService.DeleteSecondLevelCategoryAsync(id)*/);
            }
            catch(Exception ex) 
            {
                return BadRequest(ex.Message);
            }
        }

    }
}
