using AutoMapper;
using BLL.Interfaces;
using DTO.SecondLevelCategory;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.LogicServices
{
    public class SecondLevelCategoryService : ISecondLevelCategoryService
    {
        //Dependency injection of repository


        public Task<SecondLevelCategoryDTO> AddSecondLevelCategoryAsync(SecondLevelCategoryToAddDTO secondLevelcategory)
        {
            //Якщо існує батьківська категорія, то можна додати цю

            throw new NotImplementedException();
        }

        public Task DeleteSecondLevelCategoryAsync(long id)
        {
            //Якщо в цієї підкатегорії є свою підкатегорія, то цю видаляти не можна

            throw new NotImplementedException();
        }

        public Task<List<SecondLevelCategoryDTO>> GetSecondLevelCategoriesAsync()
        {
            throw new NotImplementedException();
        }

        public Task<SecondLevelCategoryDTO> GetSecondLevelCategoryByIdAsync(long id)
        {
            throw new NotImplementedException();
        }

        public Task<SecondLevelCategoryDTO> UpdateSecondLevelCategoryAsync(SecondLevelCategoryDTO secondLevelcategoryForUpdate)
        {
            throw new NotImplementedException();
        }
    }
}
