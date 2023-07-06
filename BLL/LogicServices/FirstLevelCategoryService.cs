using AutoMapper;
using BLL.Interfaces;
using DTO.FirstLevelCategory;
using DTO.Warehouse;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.LogicServices
{
    //Клас-заглушка
    class FirstLevelCategory
    {
        public long Id { get; set; }
        public string Name { get; set; } = "";
    }

    public class FirstLevelCategoryService : IFirstLevelCategoryService
    {
        //Dependency injection of the repository

        private List<FirstLevelCategory> firstLevelCategories;
        public FirstLevelCategoryService()
        {
            firstLevelCategories = new List<FirstLevelCategory>
            {
                new FirstLevelCategory
                {
                    Id= 1, Name = "FLC_1"
                },
                new FirstLevelCategory
                {
                    Id= 2, Name = "FLC_2"
                },
                new FirstLevelCategory
                {
                    Id= 3, Name = "FLC_3"
                },
                new FirstLevelCategory
                {
                    Id= 4, Name = "FLC_4"
                }
            };
        }

        public async Task<FirstLevelCategoryDTO> AddFirstLevelCategoryAsync(FirstLevelCategoryToAddDTO firstLevelCategory)
        {
            var config = new MapperConfiguration(cfg => cfg.CreateMap<FirstLevelCategoryToAddDTO, FirstLevelCategory>()
            .ForMember("Name", opt => opt.MapFrom(src => src.FirstLevelCategoryName)));

            var mapper = new Mapper(config);
            FirstLevelCategory category = mapper.Map<FirstLevelCategoryToAddDTO, FirstLevelCategory>(firstLevelCategory);
        
            firstLevelCategories.Add(category);

            //Можливо тут треба буде поправити
            return mapper.Map<FirstLevelCategory, FirstLevelCategoryDTO>(category);
        }

        public async Task DeleteFirstLevelCategoryAsync(long id)
        {
            var firstlevelCategory = firstLevelCategories.Where(w => w.Id == id).FirstOrDefault();
            if (firstlevelCategory is null)
            {
                throw new Exception();
            }

            firstLevelCategories.Remove(firstlevelCategory);

            //return 
        }

        public async Task<List<FirstLevelCategoryDTO>> GetFirstLevelCategoriesAsync()
        {
            var config = new MapperConfiguration(cfg=>cfg.CreateMap<FirstLevelCategory, FirstLevelCategoryDTO>()
            .ForMember("FirstLevelCategoryId", opt=>opt.MapFrom(src=>src.Id))
            .ForMember("FirstLevelCategoryName", opt=>opt.MapFrom(src=>src.Name)));
            var mapper = new Mapper(config);
            List<FirstLevelCategoryDTO> wares = mapper.Map<List<FirstLevelCategoryDTO>>(firstLevelCategories);
            return wares;
        }

        public async Task<FirstLevelCategoryDTO> GetFirstLevelCategoryByIdAsync(long id)
        {
            var firstlevelCategory = firstLevelCategories.Where(w => w.Id == id).FirstOrDefault();
            if (firstlevelCategory is null)
            {
                throw new Exception();
            }
            var config = new MapperConfiguration(cfg => cfg.CreateMap<FirstLevelCategory, FirstLevelCategoryDTO>()
                .ForMember("FirstLevelCategoryId", opt => opt.MapFrom(src => src.Id))
                .ForMember("FirstLevelCategoryName", opt => opt.MapFrom(src => src.Name)));

            var mapper = new Mapper(config);

            return mapper.Map<FirstLevelCategoryDTO>(firstlevelCategory);
        }

        public async Task<FirstLevelCategoryDTO> UpdateFirstLevelCategoryAsync(FirstLevelCategoryDTO firstLevelCategoryForUpdate)
        {
            FirstLevelCategory category = firstLevelCategories.Where(flc => flc.Id == firstLevelCategoryForUpdate.FirstLevelCategoryId).FirstOrDefault();
        
            if(category is null) { throw new Exception();}

            var config = new MapperConfiguration(cfg => cfg.CreateMap<FirstLevelCategoryDTO, FirstLevelCategory>()
                .ForMember("Id", opt => opt.MapFrom(src => src.FirstLevelCategoryId))
                .ForMember("Name", opt => opt.MapFrom(src => src.FirstLevelCategoryName)));

            var mapper = new Mapper(config);

            FirstLevelCategory updatedCategory = mapper.Map<FirstLevelCategory>(firstLevelCategoryForUpdate);

            //Update from repository

            return null;
        }
    }
}
