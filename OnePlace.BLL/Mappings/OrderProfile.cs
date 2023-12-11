using AutoMapper;
using OnePlace.BLL.Utilities;
using OnePlace.BOL.Enums;
using OnePlace.BOL.OrderDTO;
using OnePlace.BOL.OrderPayload;
using OnePlace.DAL.Entities;

namespace OnePlace.BLL.Mappings
{
    /// <summary>
    /// Order map profile
    /// </summary>
    public class OrderProfile : Profile
    {
        public OrderProfile()
        {
            #region Create

            CreateMap<OrderCreatePayload, OrderCreateDTO>();
            CreateMap<ProductOrderModelPayload, ProductOrderModelDTO>();

            #endregion

            CreateMap<PaymentMethod, DAL.Enums.PaymentMethod>().ReverseMap();
            CreateMap<PaymentStatus, DAL.Enums.PaymentStatus>().ReverseMap();
            CreateMap<OrderState, DAL.Enums.OrderState>().ReverseMap();

            CreateMap<OrderSearchParams, DAL.SearchParams.OrderSearchParams>().ReverseMap();

            CreateMap<Order, OrderDetails>(MemberList.Source);

            CreateMap<OrderCreateDTO, Order>(MemberList.Source);
        }
    }
}
