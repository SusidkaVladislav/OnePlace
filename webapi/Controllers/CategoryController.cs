using Microsoft.AspNetCore.Mvc;
using OnePlace.BLL.Interfaces;
using OnePlace.BLL.Services;
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
        public async Task<IActionResult> Add(CategoryCreatePayload category)
        {
            await _categoryService.Add(category);
            return Ok();
        }

        [HttpGet]
        public async Task<IActionResult> GetCategory()
        {
            var result = await _categoryService.GetAll();
            return Ok(result);
        }

        [HttpDelete]
        public async Task<IActionResult> Delete(int id)
        {
            var res = await _categoryService.Delete(id);
            return Ok(res);
        }
    }
}
