using AutoMapper;
using OnePlace.BOL.AccoountPayload;
using OnePlace.BOL.AdminDTO;
using OnePlace.BOL.AdminPayload;
using OnePlace.DAL.Entities.ViewModels;

namespace OnePlace.BLL.Mappings
{
    public class AccountProfile : Profile
    {
        public AccountProfile()
        {
            CreateMap<RegisterPayload, RegisterDTO>().ReverseMap();
            CreateMap<LoginPayload, LoginDTO>().ReverseMap();
            CreateMap<GetProductSaleStatisticPayload, GetProductSaleStatisticDTO>().ReverseMap();
        }
    }
}
