using AutoMapper;
using OnePlace.BOL;
using OnePlace.BOL.CategoryDTO;
using OnePlace.BOL.Review;
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
        }
    }
}
