using OnePlace.BOL.Enums;

namespace OnePlace.BOL.OrderPayload
{
    public class OrderChangeStatePayload
    {
        public int orderId { get; set; }
        public OrderState orderState { get; set; }
    }
}
