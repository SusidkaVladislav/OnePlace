using OnePlace.BOL.CategoryDTO;
using OnePlace.BOL.CategoryPayload;

namespace OnePlace.BLL.Interfaces
{
    public interface ICategoryService
    {
        /// <summary>
        /// Повертає всі категорії
        /// </summary>
        /// <returns></returns>
        Task<List<PureCategory>> GetCategories();
      
        /// <summary>
        /// Повертає одну категорію за ідентифікатором
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        Task<CategoryDetails> GetCategory(int id);
        
        /// <summary>
        /// Створити нову категорію
        /// </summary>
        /// <param name="childCategory"></param>
        /// <returns></returns>
        Task<int> Add(CategoryCreatePayload category);
       
        /// <summary>
        /// Редагувати категорію
        /// </summary>
        /// <param name="category"></param>
        /// <returns></returns>
        Task<int> Update(CategorUpdatePayload category);
        
        /// <summary>
        /// Видалити категорію
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        Task<int> Delete(int id);

       Task<List<CategoryWithPicture>> GetAllForSelectCategories();
    }
}
