using OnePlace.BOL.Enums;

namespace OnePlace.BOL.OrderDTO
{
    public class OrderCreateDTO
    {
        public int OrderNumber { get; set; }
        public int UserId { get; set; }
        public int DeliveryId { get; set; }
        public string Comment { get; set; }
        public OrderState State { get; set; }
        public DateTime Date { get; set; }
    }
}