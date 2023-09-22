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
            CreateMap<CategorUpdatePayload, CategoryUpdateDTO>();

            CreateMap<CategoryUpdateDTO, Category>(MemberList.Source);

            CreateMap<Category, CategoryDetails>(MemberList.Source)
                .ForMember(d=>d.ParentId, p=>p.MapFrom(s=>s.ParentCategoryId))
                .ForMember(d=>d.ChildrenCategories, p=>p.MapFrom(s=>s.ChildCategories));

            //CreateMap<List<Category>, List<PureCategory>>(MemberList.Destination)
            //    .ForMember(d => d.Select(f => f.HasProducts), p => p.MapFrom(s => s.Select(f => f.Products.Count)));

            CreateMap<CategoryCreatePayload, CategoryCreateDTO>();

            CreateMap<CategoryCreateDTO, Category>(MemberList.Source)
                .ForMember(d=>d.ParentCategoryId, p=>p.MapFrom(s=>s.ParentId));

            CreateMap<Category, PureCategory>(MemberList.Destination)
                .ForMember(d => d.HasProducts, p => p.MapFrom(s => s.Products.Count > 0));
        }
    }
}
