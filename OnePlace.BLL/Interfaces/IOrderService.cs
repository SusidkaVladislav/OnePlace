using OnePlace.BLL.Utilities;
using OnePlace.BOL.OrderDTO;
using OnePlace.BOL.OrderPayload;

namespace OnePlace.BLL.Interfaces
{
    public interface IOrderService
    {
        Task<OrderDetails> GetOrder(int orderId);

        /// <summary>
        /// Універсальний метод для фільтрування замовлень
        /// </summary>
        /// <param name="filters"></param>
        /// <returns></returns>
        Task<List<OrderDetails>> FilterProduct(OrderSearchParams filters);

        Task<int> CreateOrder(OrderCreatePayload order);
        Task<int> UpdateOrder(OrderPayload order);
        Task<int> DeleteOrder(int orderId);
    }
}
