using BLL.Interfaces;
using DTO.Order;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.LogicServices
{
    public class OrderService : IOrderService
    {
        public async Task<OrderDTO> AddOrderAsync(OrderToAddDTO orderToAdd)
        {
            throw new NotImplementedException();
        }

        public async Task DeleteOrderAsync(long id)
        {
            throw new NotImplementedException();
        }

        public async Task<OrderDTO> GetOrderByIdAsync(long id)
        {
            throw new NotImplementedException();
        }

        public async Task<List<OrderDTO>> GetOrdersAsync()
        {
            throw new NotImplementedException();
        }

        public async Task<OrderDTO> UpdateOrderAsync(OrderDTO orderDTO)
        {
            throw new NotImplementedException();
        }
    }
}
