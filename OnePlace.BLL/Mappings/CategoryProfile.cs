using AutoMapper;
using OnePlace.BOL.CategoryDTO;
using OnePlace.BOL.CategoryPayload;
using OnePlace.DAL.Entities;

namespace OnePlace.BLL.Mappings
{
    /// <summary>
    /// Category map profile
    /// </summary>
    public class CategoryProfile : Profile
    {
        public CategoryProfile()
        {
            CreateMap<CategorUpdatePayload, CategoryUpdateDTO>();

            CreateMap<CategoryUpdateDTO, Category>(MemberList.Source);

            CreateMap<Category, CategoryDetails>(MemberList.Source)
                .ForMember(d => d.ParentId, p => p.MapFrom(s => s.ParentCategoryId))
                .ForMember(d => d.ChildrenCategories, p => p.MapFrom(s => s.ChildCategories));


            CreateMap<CategoryCreatePayload, CategoryCreateDTO>();

            CreateMap<CategoryCreateDTO, Category>(MemberList.Source)
                .ForMember(d => d.ParentCategoryId, p => p.MapFrom(s => s.ParentId));

            CreateMap<Category, PureCategory>(MemberList.Destination)
                .ForMember(d => d.HasProducts, p => p.MapFrom(s => s.Products.Count > 0))
                .ForMember(d => d.PictureURL, p => p.MapFrom(s => s.Picture.Address))
                .ForMember(d => d.DeletePictureURL, p => p.MapFrom(s => s.Picture.DeleteAddress));

        }
    }
}
