using BLL.Interfaces;
using DTO.ThirdLevelCategory;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.LogicServices
{
    public class ThirdLevelCategoryService : IThirdLevelCategoryService
    {
        //Dependency injection of repository

        public async Task<ThirdLevelCategoryDTO> AddThirdLevelCategoryAsync(ThirdLevelCategoryToAddDTO thirdLevelcategory)
        {
            throw new NotImplementedException();
        }

        public async Task DeleteThirdLevelCategoryAsync(long id)
        {
            throw new NotImplementedException();
        }

        public async Task<List<ThirdLevelCategoryDTO>> GetThirdLevelCategoriesAsync()
        {
            throw new NotImplementedException();
        }

        public async Task<ThirdLevelCategoryDTO> GetThirdLevelCategoryByIdAsync(long id)
        {
            throw new NotImplementedException();
        }

        public async Task<ThirdLevelCategoryDTO> UpdateThirdLevelCategoryAsync(ThirdLevelCategoryDTO thirdLevelcategoryForUpdate)
        {
            throw new NotImplementedException();
        }
    }
}
