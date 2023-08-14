using AutoMapper;
using OnePlace.BLL.Utilities;
using OnePlace.BOL;
using OnePlace.BOL.Description;
using OnePlace.BOL.Picture;
using OnePlace.BOL.ProductDTO;
using OnePlace.BOL.ProductPayload;
using OnePlace.DAL.Entities;


namespace OnePlace.BLL.Mappings
{
    public class ProductProfile: Profile
    {
        /// <summary>
        /// Product map profile 
        /// </summary>
        public ProductProfile()
        {
            CreateMap<ProductPayload, ProductDTO>(MemberList.None);
            CreateMap<ProductDTO, Product>();
            CreateMap<ProductCreatePayload, ProductCreateDTO>();
            CreateMap<ProductCreateDTO, Product>(MemberList.None);
            CreateMap<ProductDescription, ProductDescriptionDetails>(MemberList.Destination);

            CreateMap <Product, ProductDetails>()
               .ForMember(dest => dest.Price, opt => opt.MapFrom(src => (float)src.Price))
               .ForMember(dest => dest.Descriptions, opt => opt.MapFrom(src => src.ProductDescriptions))
               .ForMember(dest => dest.Pictures, opt => opt.MapFrom(src => src.ProductPictures));

            CreateMap<ManufactureCountry, ManufacturerCountryDTO>(MemberList.Destination);
            CreateMap<Manufacturer, ManufacturerDTO>(MemberList.Destination);
            CreateMap<Material, MaterialDTO>(MemberList.Destination);
            CreateMap<Color, ColorDTO>(MemberList.Destination);
            CreateMap<Gender, GenderDTO>(MemberList.Destination);
            CreateMap<ProductPicture, ProductPictureDTO>(MemberList.Destination);
            CreateMap<ProductPicture, ProductPictureDetails>(MemberList.Destination);


            CreateMap<BaseSearchParams, DAL.SearchParams.BaseSearchParams>();
            CreateMap<ProductSearchParams, DAL.SearchParams.ProductSearchParams>();
            
            CreateMap<DAL.SearchParams.BaseSearchParams, BaseSearchParams>();
            CreateMap<DAL.SearchParams.ProductSearchParams, ProductSearchParams>();

            CreateMap<DAL.SearchParams.ProductDescriptionSearchParams, ProductDescriptionSearchParams>().ReverseMap();

            CreateMap<DAL.Models.PaginatedList<Product>, PaginatedList<ProductDetails>>();

            //CreateMap<BaseSearchParams, DAL.SearchParams.BaseSearchParams>()
              //  .Include<ProductSearchParams, DAL.SearchParams.ProductSearchParams>();
            
        }
    }
}
