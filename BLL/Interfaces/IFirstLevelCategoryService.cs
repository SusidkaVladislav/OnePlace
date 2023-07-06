using DTO.FirstLevelCategory;
using DTO.Warehouse;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Interfaces
{
    public interface IFirstLevelCategoryService
    {
        Task<List<FirstLevelCategoryDTO>> GetFirstLevelCategoriesAsync();
        Task<FirstLevelCategoryDTO> GetFirstLevelCategoryByIdAsync(long id);
        Task<FirstLevelCategoryDTO> AddFirstLevelCategoryAsync(FirstLevelCategoryToAddDTO firstLevelCategory);
        Task<FirstLevelCategoryDTO> UpdateFirstLevelCategoryAsync(FirstLevelCategoryDTO firstLevelCategoryForUpdate);
        Task DeleteFirstLevelCategoryAsync(long id);
    }
}
