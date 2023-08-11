using AutoMapper;
using OnePlace.BOL.CategoryDTO;
using OnePlace.BOL.CategoryPayload;
using OnePlace.DAL.Entities;

namespace OnePlace.BLL.Mappings
{
    /// <summary>
    /// Category map profile
    /// </summary>
    public class CategoryProfile: Profile
    {
        public CategoryProfile()
        {
            CreateMap<CategoryPayload, CategoryDTO>(MemberList.None);
            
            CreateMap<CategoryDTO, Category>(MemberList.Destination)
                .ForMember(d=>d.ParentCategoryId, p=>p.MapFrom(s=>s.ParentId));

            CreateMap<Category, CategoryDetails>(MemberList.Source)
                .ForMember(d=>d.ParentId, p=>p.MapFrom(s=>s.ParentCategoryId));

            CreateMap<CategoryCreatePayload, CategoryCreateDTO>();

            CreateMap<CategoryCreateDTO, Category>(MemberList.Source)
                .ForMember(d=>d.ParentCategoryId, p=>p.MapFrom(s=>s.ParentId));


            // MemberList.Source -- Обов'язково всі поля мають бути з джерела
            // MemberList.Destination -- Обов'язково всі поля мають бути з класа до якого відбувається приведення
        }
    }
}
