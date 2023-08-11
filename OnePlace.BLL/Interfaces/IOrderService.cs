using OnePlace.BLL.Utilities;
using OnePlace.BOL.OrderDTO;
using OnePlace.BOL.OrderPayload;

namespace OnePlace.BLL.Interfaces
{
    public interface IOrderService
    {
        /// <summary>
        /// Повертає замовлення за ідентифікатором
        /// </summary>
        /// <param name="orderId"></param>
        /// <returns></returns>
        Task<OrderDetails> GetOrder(int orderId);

        /// <summary>
        /// Універсальний метод для фільтрування замовлень
        /// </summary>
        /// <param name="filters"></param>
        /// <returns></returns>
        Task<List<OrderDetails>> FilterProduct(OrderSearchParams filters);

        /// <summary>
        /// Створити замовлення
        /// </summary>
        /// <param name="order"></param>
        /// <returns></returns>
        Task<int> CreateOrder(OrderCreatePayload order);

        /// <summary>
        /// Редагувати замовлення
        /// </summary>
        /// <param name="order"></param>
        /// <returns></returns>
        Task<int> UpdateOrder(OrderPayload order);
        
        /// <summary>
        /// Видалити замовлення
        /// </summary>
        /// <param name="orderId"></param>
        /// <returns></returns>
        Task<int> DeleteOrder(int orderId);
    }
}
