using AutoMapper;
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
        public ProductProfile()
        {
            CreateMap<ProductPayload, ProductDTO>(MemberList.None);
            
            CreateMap<ProductDTO, Product>();
            
            CreateMap<ProductCreatePayload, ProductCreateDTO>();

            CreateMap<ProductCreateDTO, Product>(MemberList.None);

            CreateMap<ProductDescription, ProductDescriptionDetails>(MemberList.Destination);

            CreateMap<Product, ProductDetails>(MemberList.Source);



            CreateMap <Product, ProductDetails>()
               .ForMember(dest => dest.Price, opt => opt.MapFrom(src => (float)src.Price))
               .ForMember(dest => dest.ManufacturerCountry, opt => opt.MapFrom(src => src.ManufacturerCountry))
               .ForMember(dest => dest.Manufacturer, opt => opt.MapFrom(src => src.Manufacturer))
               .ForMember(dest => dest.Material, opt => opt.MapFrom(src => src.Material))
               .ForMember(dest => dest.Color, opt => opt.MapFrom(src => src.Color))
               .ForMember(dest => dest.Gender, opt => opt.MapFrom(src => src.Gender))
               .ForMember(dest => dest.Category, opt => opt.MapFrom(src => src.Category))
               .ForMember(dest => dest.Descriptions, opt => opt.MapFrom(src => src.ProductDescriptions))
               .ForMember(dest => dest.Pictures, opt => opt.MapFrom(src => src.ProductPictures));

            CreateMap<ManufactureCountry, ManufacturerCountryDTO>(MemberList.Destination);
            CreateMap<Manufacturer, ManufacturerDTO>(MemberList.Destination);
            CreateMap<Material, MaterialDTO>(MemberList.Destination);
            CreateMap<Color, ColorDTO>(MemberList.Destination);
            CreateMap<Gender, GenderDTO>(MemberList.Destination);
            CreateMap<ProductPicture, ProductPictureDTO>(MemberList.Destination);
        }
    }
}
