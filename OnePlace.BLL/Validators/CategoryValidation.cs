using OnePlace.BOL.ProductDTO;
using OnePlace.DAL.Entities;
using OnePlace.DAL.Interfaces;

namespace OnePlace.BLL.Validators
{
    /// <summary>
    /// Клас валідації категорій
    /// </summary>
    public class CategoryValidation
    {
        private IUnitOfWork _unitOfWork;

        public CategoryValidation(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<bool> HasSubCategory(int categoryId)
        {
            IEnumerable<Category> categories = await _unitOfWork.Categories.FindAsync(
                c => c.ParentCategoryId == categoryId);
            if(categories.Count() > 0) 
                return true;
            return false;
        }

        public async Task<bool> Exists(int categoryId)
        {
            if(await _unitOfWork.Categories.GetAsync(categoryId) != null)
                return true;
            return false;
        }
    }
}