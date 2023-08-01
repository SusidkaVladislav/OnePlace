using OnePlace.BOL.CategoryDTO;
using OnePlace.BOL.CategoryPayload;

namespace OnePlace.BLL.Interfaces
{
    public interface ICategoryService
    {
        Task<List<CategoryDetails>> GetAll();
      
        Task<CategoryDetails> Get(int id);
        
        Task Add(CategoryCreatePayload childCategory);
       
        Task<int> Update(CategoryPayload category);
        
        Task<int> Delete(int id);
    }
}
