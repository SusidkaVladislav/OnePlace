using AutoMapper;
using OnePlace.BOL.OrderDTO;
using OnePlace.BOL.OrderPayload;
using OnePlace.DAL.Entities;

namespace OnePlace.BLL.Mappings
{
    /// <summary>
    /// Order map profile
    /// </summary>
    public class OrderProfile: Profile
    {
        public OrderProfile()
        {
            CreateMap<OrderPayload, OrderDTO>();

            CreateMap<OrderDTO, Order>();

            CreateMap<Order, OrderDetails>(MemberList.Source);
            
            CreateMap<OrderCreatePayload, OrderCreateDTO>();
            
            CreateMap<OrderCreateDTO, Order>(MemberList.Source);


        }
    }
}
