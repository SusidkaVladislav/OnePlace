using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using OnePlace.BLL.Interfaces;
using OnePlace.BOL.CategoryPayload;

namespace webapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly ICategoryService _categoryService;
        public CategoryController(ICategoryService categoryService)
        {
            _categoryService = categoryService;
        }

        [HttpPost("create")]
        [Authorize(Roles = "admin")]
        public async Task<IActionResult> CreateCategory(CategoryCreatePayload category)
        {
            var result = await _categoryService.Add(category);
            return Ok(result);
        }

        //Повертає самі верхні категорії
        [HttpGet("categories")]
        public async Task<IActionResult> GetCategories()
        {
            var result = await _categoryService.GetCategories();
            return Ok(result);
        }

        //Повертає категорію за id, та всіх її безпосередніх sub-categories
        [HttpGet("category/{id}")]
        public async Task<IActionResult> GetCategory(int id)
        {
            var result = await _categoryService.GetCategory(id);
            return Ok(result);
        }

        [HttpDelete("delete")]
        [Authorize(Roles = "admin")]
        public async Task<IActionResult> DeleteCategory(int id)
        {
            var result = await _categoryService.Delete(id);
            return Ok(result);
        }

        [HttpPut("update")]
        [Authorize(Roles = "admin")]
        public async Task<IActionResult> UpdateCategory(CategorUpdatePayload categorUpdate)
        {
            var result = await _categoryService.Update(categorUpdate);
            return Ok(result);
        }

        [HttpGet("forSelect")]
        public async Task<IActionResult> GetAllCategoriesForSelect()
        {
            var res = await _categoryService.GetAllForSelectCategories();
            return Ok(res);
        }
    }
}
