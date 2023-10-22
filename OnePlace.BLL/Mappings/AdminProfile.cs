using AutoMapper;
using OnePlace.BOL;
using OnePlace.BOL.Message;
using OnePlace.BOL.Review;
using OnePlace.BOL.ReviewReply;
using OnePlace.BOL.User;
using OnePlace.DAL.Entities;

namespace OnePlace.BLL.Mappings
{
    public class AdminProfile: Profile
    {
        public AdminProfile()
        {
            CreateMap<User, PureUser>(MemberList.Destination);
            CreateMap<ReviewReplyPayload, ReviewReply>(MemberList.Source);
            CreateMap<Message, MessageDTO>(MemberList.Source);
            CreateMap<Review, ReviewDTO>(MemberList.Source);
            CreateMap<ReviewReply, ReviewReplyDTO>(MemberList.Source);
            CreateMap<Manufacturer, ManufacturerDTO>().ReverseMap();
            CreateMap<ManufactureCountry, ManufacturerCountryDTO>().ReverseMap();
            CreateMap<Color, ColorDTO>(MemberList.Destination).ReverseMap();
            CreateMap<ColorToAdd, Color>();
        }
    }
}
