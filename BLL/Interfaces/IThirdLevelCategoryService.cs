using DTO.SecondLevelCategory;
using DTO.ThirdLevelCategory;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Interfaces
{
    public interface IThirdLevelCategoryService
    {
        Task<List<ThirdLevelCategoryDTO>> GetThirdLevelCategoriesAsync();
        Task<ThirdLevelCategoryDTO> GetThirdLevelCategoryByIdAsync(long id);
        Task<ThirdLevelCategoryDTO> AddThirdLevelCategoryAsync(ThirdLevelCategoryToAddDTO thirdLevelcategory);
        Task<ThirdLevelCategoryDTO> UpdateThirdLevelCategoryAsync(ThirdLevelCategoryDTO thirdLevelcategoryForUpdate);
        Task DeleteThirdLevelCategoryAsync(long id);
    }
}
