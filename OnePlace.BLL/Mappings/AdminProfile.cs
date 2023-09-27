using AutoMapper;
using OnePlace.BOL.CategoryDTO;
using OnePlace.BOL.Message;
using OnePlace.BOL.OrderDTO;
using OnePlace.BOL.Review;
using OnePlace.BOL.ReviewReply;
using OnePlace.BOL.User;
using OnePlace.DAL.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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
        }
    }
}
