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

        [HttpPost]
        //[Authorize(Roles = "admin")]
        public async Task<IActionResult> CreateCategory(CategoryCreatePayload category)
        {
            var result = await _categoryService.Add(category);
            return Ok(result);
        }

        //Повертає самі верхні категорії
        [HttpGet]
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

        [HttpDelete]
        //[Authorize(Roles = "admin")]
        public async Task<IActionResult> DeleteCategory(int id)
        {
            var result = await _categoryService.Delete(id);
            return Ok(result);
        }

        [HttpPut]
        public async Task<IActionResult> UpdateCategory(CategorUpdatePayload categorUpdate)
        {
            var result = await _categoryService.Update(categorUpdate);
            return Ok(result);
        }
    }
}
