using OnePlace.BLL.Utilities;
using OnePlace.BOL.Enums;
using OnePlace.BOL.OrderDTO;
using OnePlace.BOL.OrderPayload;
using Stripe.Checkout;

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
        Task<List<OrderListModel>> FilterOrders(OrderSearchParams filters);

        /// <summary>
        /// Створити замовлення де яке оплачується готівкою
        /// </summary>
        /// <param name="order"></param>
        /// <returns></returns>
        Task<int> CreateCashOrder(OrderCreatePayload order);

        /// <summary>
        /// Створити замовлення яке оплачується карткою
        /// </summary>
        /// <param name="orderCreate"></param>
        /// <returns></returns>
        Task<Session> CreateCardOrder(OrderCreatePayload orderCreate);

        /// <summary>
        /// Змінити статус оплати (вручну)
        /// </summary>
        /// <param name="orderId"></param>
        /// <param name="paymentStatus"></param>
        /// <returns></returns>
        Task<int> ChangePaymentStatus(int orderId, PaymentStatus paymentStatus);

        /// <summary>
        /// Змінити статус замовлення (вручну)
        /// </summary>
        /// <param name="orderId"></param>
        /// <param name="orderState"></param>
        /// <returns></returns>
        Task<int> ChangeOrderState(int orderId, OrderState orderState);


        /// <summary>
        /// Повертає всі замовлення за певний період
        /// </summary>
        /// <param name="date"></param>
        /// <returns></returns>
        Task<List<OrderListModel>> GetOrdersByDate(DateTime? date);

        Task<List<OrderListModel>> GetAllOrders();

        Task<int> DeleteOrer(int id);

        Task<List<OrderDetails>> GetAllUsersOrders();
    }
}
