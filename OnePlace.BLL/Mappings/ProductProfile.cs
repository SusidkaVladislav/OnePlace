using AutoMapper;
using OnePlace.BLL.Utilities;
using OnePlace.BOL;
using OnePlace.BOL.Description;
using OnePlace.BOL.DescriptionDTO;
using OnePlace.BOL.Picture;
using OnePlace.BOL.ProductColor;
using OnePlace.BOL.ProductDTO;
using OnePlace.BOL.ProductPayload;
using OnePlace.DAL.Entities;


namespace OnePlace.BLL.Mappings
{
    public class ProductProfile : Profile
    {
        /// <summary>
        /// Product map profile 
        /// </summary>
        public ProductProfile()
        {
            #region Add product

            CreateMap<ProductCreatePayload, ProductCreateDTO>();
            CreateMap<ProductColorPayload, ProductColorDTO>();

            CreateMap<ProductCreateDTO, Product>(MemberList.None);
            CreateMap<ProductColorDTO, ProductColor>(MemberList.Source);

            CreateMap<ProductDescriptionDTO, ProductDescription>();
            CreateMap<ProductPictureDTO, ProductPicture>();

            #endregion

            CreateMap<Color, ColorDTO>().ReverseMap();

            CreateMap<PayloadProductIdColorId, ProductIdColorId>().ReverseMap();

            #region Updating
            CreateMap<ProductUpdatePayload, ProductUpdateDTO>(MemberList.None);
            CreateMap<ProductUpdateDTO, Product>();
            #endregion

            CreateMap<ProductColor, ProductColorDetails>();

            CreateMap<ProductDescription, ProductDescriptionDetails>(MemberList.Destination);

            CreateMap<Product, ProductDetails>()
               .ForMember(dest => dest.Descriptions, opt => opt.MapFrom(src => src.ProductDescriptions))
               .ForMember(dest => dest.Pictures, opt => opt.MapFrom(src => src.ProductPictures));

            #region Manufacturing
            CreateMap<ManufactureCountry, ManufacturerCountryDTO>(MemberList.Destination);
            CreateMap<Manufacturer, ManufacturerDTO>(MemberList.Destination);
            #endregion

            #region Pictures
            CreateMap<ProductPicture, ProductPictureDTO>(MemberList.Destination);
            CreateMap<ProductPicture, ProductPictureDetails>(MemberList.Destination);
            #endregion

            #region SearchParams
            CreateMap<BaseSearchParams, DAL.SearchParams.BaseSearchParams>();
            CreateMap<ProductSearchParams, DAL.SearchParams.ProductSearchParams>();

            CreateMap<DAL.SearchParams.BaseSearchParams, BaseSearchParams>();
            CreateMap<DAL.SearchParams.ProductSearchParams, ProductSearchParams>();

            CreateMap<DAL.SearchParams.ProductDescriptionSearchParams, ProductDescriptionSearchParams>().ReverseMap();

            CreateMap<DAL.Models.PaginatedList<Product>, PaginatedList<ProductDetails>>();
            #endregion
        }
    }
}
