using OnePlace.BOL.Enums;

namespace OnePlace.BLL.Utilities
{
    /// <summary>
    /// Параметри пошуку замовлення
    /// </summary>
    public class OrderSearchParams
    {
        /// <summary>
        /// Замовлення певного користувача
        /// </summary>
        public int? UserId { get; set; }

        /// <summary>
        /// Фільтрування за датою замовлення
        /// </summary>
        public DateTime? Date { get; set; }

        /// <summary>
        /// Фільтрування за станом замовлення
        /// </summary>
        public OrderState? State { get; set; }

        /// <summary>
        /// Сторінка з якої почати вибір замовлень
        /// </summary>
        public int? Page { get; set; } = 1;

        /// <summary>
        /// Кількість замовлень з сторінки
        /// </summary>
        public int? Limit { get; set; } = 10;
    }
}
