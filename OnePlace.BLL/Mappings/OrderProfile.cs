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
            #region Create

            CreateMap<OrderCreatePayload, OrderCreateDTO>();
            CreateMap<ProductOrderModelPayload, ProductOrderModelDTO>();

            #endregion

            CreateMap<OrderPayload, OrderDTO>();

            CreateMap<OrderDTO, Order>();

            CreateMap<Order, OrderDetails>(MemberList.Source);
            
            
            
            CreateMap<OrderCreateDTO, Order>(MemberList.Source);
        }
    }
}
