using AutoMapper;
using OnePlace.BOL.Message;
using OnePlace.BOL.Password;
using OnePlace.BOL.Picture;
using OnePlace.BOL.Review;
using OnePlace.BOL.ShoppingCart;
using OnePlace.DAL.Entities;

namespace OnePlace.BLL.Mappings
{
    public class UserProfile : Profile
    {
        public UserProfile() {

            CreateMap<CreateReviewPayload, CreateReviewDTO>();
            CreateMap<CreateReviewDTO, Review>(MemberList.Source);

            CreateMap<ShoppingCartPayload, ShoppingCartDTO>();
            CreateMap<ShoppingCartDTO, ShoppingCart>(MemberList.Source);

            CreateMap<ShoppingCartPayload, ShoppingCartDTO>();
            CreateMap<ShoppingCartDTO, ShoppingCart>(MemberList.Source);

            CreateMap<MessagePayload, Message>(MemberList.Source);

            CreateMap<PasswordUpdatePayload, PasswordUpdateDTO>();

            CreateMap<UserPicturePayload, UserPictureDTO>();
        }
    }
}
