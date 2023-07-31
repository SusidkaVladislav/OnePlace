using AutoMapper;
using OnePlace.BLL.Interfaces;
using OnePlace.BOL.CategoryDTO;
using OnePlace.BOL.CategoryPayload;

namespace OnePlace.BLL.Services
{
    public class CategoryService : ICategoryService
    {
        private readonly IMapper _mapper;
        public CategoryService(IMapper mapper)
        {
            _mapper = mapper;
        }

        public Task<int> AddSubcategory(int parentId, CategoryCreatePayload childCategory)
        {
            throw new NotImplementedException();
        }

        public Task<int> DeleteCategory(int id)
        {
            throw new NotImplementedException();
        }

        public Task<List<CategoryDetails>> GetCategories()
        {
            throw new NotImplementedException();
        }

        public Task<CategoryDetails> GetCategory(int id)
        {
            throw new NotImplementedException();
        }

        public Task<int> UpdateCategory(CategoryPayload category)
        {
            throw new NotImplementedException();
        }
    }
}
