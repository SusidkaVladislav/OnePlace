using DTO.SecondLevelCategory;
using DTO.Warehouse;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Interfaces
{
    public interface ISecondLevelCategoryService
    {
        Task<List<SecondLevelCategoryDTO>> GetSecondLevelCategoriesAsync();
        Task<SecondLevelCategoryDTO> GetSecondLevelCategoryByIdAsync(long id);
        Task<SecondLevelCategoryDTO> AddSecondLevelCategoryAsync(SecondLevelCategoryToAddDTO secondLevelcategory);
        Task<SecondLevelCategoryDTO> UpdateSecondLevelCategoryAsync(SecondLevelCategoryDTO secondLevelcategoryForUpdate);
        Task DeleteSecondLevelCategoryAsync(long id);
    }
}
