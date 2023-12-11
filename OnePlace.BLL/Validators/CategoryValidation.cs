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

        /// <summary>
        /// Повертає false, якщо категорія не має підкатегорій
        /// Повертає true, якщо категорія має підкатегорії
        /// </summary>
        /// <param name="categoryId"></param>
        /// <returns></returns>
        public async Task<bool> HasSubCategory(int categoryId)
        {
            IEnumerable<Category> categories = await _unitOfWork.Categories.FindAsync(
                c => c.ParentCategoryId == categoryId);
            if (categories.Count() > 0)
                return true;
            return false;
        }

        /// <summary>
        /// Повертає false, якщо категорія з переданим ідентифікатором ще не існує
        /// Повертає true, якщо категорія з переданим ідентифікатором вже існує
        /// </summary>
        /// <param name="categoryName"></param>
        /// <returns></returns>
        public async Task<bool> Exists(int categoryId)
        {
            if (await _unitOfWork.Categories.GetAsync(categoryId) != null)
                return true;
            return false;
        }

        /// <summary>
        /// Повертає false, якщо категорія з переданою назвою вже існує
        /// Повертає true, якщо категорія з переданою назвою ще не існує
        /// </summary>
        /// <param name="categoryName"></param>
        /// <returns></returns>
        public async Task<bool> IsUnique(string categoryName)
        {
            var categories = await _unitOfWork.Categories
                .FindAsync(c => c.Name == categoryName);

            if (categories.Any())
                return false;

            return true;
        }

        /// <summary>
        /// Повертає false, якщо переданий ідентифікатор (0<) неіснуючої категорії
        /// Повертає true, якщо за переданим ідентифікатором існує категорія
        /// </summary>
        /// <param name="parentId"></param>
        /// <returns></returns>
        public async Task<bool> IsCorrectParentCategory(int? parentId)
        {
            if (parentId != null && parentId > 0)
                if (await _unitOfWork.Categories.GetAsync(parentId ?? default(int)) == null)
                    return false;
            return true;

        }

        /// <summary>
        /// Повертає fasle, якщо категорія не містить товарів
        /// Повертає true, якщо категорія містить товари
        /// </summary>
        /// <param name="categoryId"></param>
        /// <returns></returns>
        public async Task<bool> IsFinalCategory(int? categoryId)
        {
            IEnumerable<Product> products = await _unitOfWork.Products.
                FindAsync(p => p.Category.Id == categoryId);
            if (products.Count() > 0)
                return true;
            return false;
        }
    }
}