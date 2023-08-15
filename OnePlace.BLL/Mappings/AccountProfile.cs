using AutoMapper;
using OnePlace.BOL.AccoountPayload;
using OnePlace.DAL.Entities.ViewModels;

namespace OnePlace.BLL.Mappings
{
    public class AccountProfile: Profile
    {
        public AccountProfile()
        {
            CreateMap<RegisterPayload, RegisterDTO>().ReverseMap();
            CreateMap<LoginPayload, LoginDTO>().ReverseMap();
        }
    }
}
