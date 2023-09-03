using OnePlace.DAL.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OnePlace.DAL.SearchParams
{
    public class OrderSearchParams: BaseSearchParams
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
        public OrderState? State { get; set; } = null;

        /// <summary>
        /// Фільтрування за ім'ям/прізвищем покупця
        /// </summary>
        public string? UserInitials { get; set; } = null;

        /// <summary>
        /// Фільтрування за статусом оплати
        /// </summary>
        public PaymentStatus? PaymentStatus { get; set; } = null;
    }
}
