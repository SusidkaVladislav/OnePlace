using AutoMapper;
using OnePlace.BOL.Description;
using OnePlace.BOL.ProductDTO;
using OnePlace.BOL.ProductPayload;
using OnePlace.DAL.Entities;


namespace OnePlace.BLL.Mappings
{
    public class ProductProfile: Profile
    {
        public ProductProfile()
        {
            CreateMap<ProductPayload, ProductDTO>();
            
            CreateMap<ProductDTO, Product>(MemberList.None);

            CreateMap<Product, ProductDetails>();
            
            CreateMap<ProductCreatePayload, ProductCreateDTO>();

            CreateMap<ProductCreateDTO, Product>();

            CreateMap<ProductDescription, ProductDescriptionDetails>(MemberList.Destination);

            CreateMap<Product, ProductDetails>(MemberList.Source);
        }
    }
}
