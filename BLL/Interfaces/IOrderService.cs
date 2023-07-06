using DTO.Delivery;
using DTO.Order;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Interfaces
{
    public interface IOrderService
    {
        Task<List<OrderDTO>> GetOrdersAsync();
        Task<OrderDTO> GetOrderByIdAsync(long id);
        Task<OrderDTO> AddOrderAsync(OrderToAddDTO orderToAdd);
        Task<OrderDTO> UpdateOrderAsync(OrderDTO orderDTO);
        Task DeleteOrderAsync(long id);
    }
}
