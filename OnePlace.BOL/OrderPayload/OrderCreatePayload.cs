using OnePlace.BOL.Enums;

namespace OnePlace.BOL.OrderPayload
{
    public class OrderCreatePayload
    {
        public int UserId { get; set; }
        public int DeliveryId { get; set; }
        public string Comment { get; set; }
        public OrderState State { get; set; }
        public DateTime Date { get; set; }
    }
}
