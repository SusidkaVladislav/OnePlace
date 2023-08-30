using OnePlace.BOL.Enums;

namespace OnePlace.BLL.Utilities
{
    /// <summary>
    /// Параметри пошуку замовлення
    /// </summary>
    public class OrderSearchParams: BaseSearchParams
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
        public OrderStates? State { get; set; }
    }
}
