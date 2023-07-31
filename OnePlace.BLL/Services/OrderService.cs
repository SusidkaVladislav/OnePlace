using AutoMapper;
using OnePlace.BLL.Interfaces;
using OnePlace.BLL.Utilities;
using OnePlace.BOL.OrderDTO;
using OnePlace.BOL.OrderPayload;

namespace OnePlace.BLL.Services
{
    public class OrderService : IOrderService
    {
        private readonly IMapper _mapper;
        public OrderService(IMapper mapper)
        {
            _mapper = mapper;
        }

        public Task<int> CreateOrder(OrderCreatePayload order)
        {
            throw new NotImplementedException();
        }

        public Task<int> DeleteOrder(int orderId)
        {
            throw new NotImplementedException();
        }

        public Task<List<OrderDetails>> FilterProduct(OrderSearchParams filters)
        {
            throw new NotImplementedException();
        }

        public Task<OrderDetails> GetOrder(int orderId)
        {
            throw new NotImplementedException();
        }

        public Task<int> UpdateOrder(OrderPayload order)
        {
            throw new NotImplementedException();
        }
    }
}
