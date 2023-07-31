using OnePlace.BOL.CategoryDTO;
using OnePlace.BOL.CategoryPayload;

namespace OnePlace.BLL.Interfaces
{
    public interface ICategoryService
    {
        Task<List<CategoryDetails>> GetCategories();
      
        Task<CategoryDetails> GetCategory(int id);
        
        Task<int> AddSubcategory(int parentId, CategoryCreatePayload childCategory);
       
        Task<int> UpdateCategory(CategoryPayload category);
        
        Task<int> DeleteCategory(int id);
    }
}
