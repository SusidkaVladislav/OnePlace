namespace OnePlace.BLL.Utilities
{
    /// <summary>
    /// Параметри пошуку замовлення
    /// </summary>
    public class OrderSearchParams : BaseSearchParams
    {
        /// <summary>
        /// Замовлення певного користувача
        /// </summary>
        public int? UserId { get; set; } = null;

        /// <summary>
        /// Фільтрування за датою замовлення
        /// </summary>
        public DateTime? Date { get; set; } = null;

        /// <summary>
        /// Фільтрування за станом замовлення
        /// </summary>
        public BOL.Enums.OrderState? State { get; set; } = null;

        /// <summary>
        /// Фільтрування за ім'ям/прізвищем покупця
        /// </summary>
        public string? UserInitials { get; set; } = null;

        /// <summary>
        /// Фільтрування за статусом оплати
        /// </summary>
        public BOL.Enums.PaymentStatus? PaymentStatus { get; set; } = null;
    }
}
