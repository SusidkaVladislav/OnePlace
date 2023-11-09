using OnePlace.BOL.Enums;

namespace OnePlace.BOL.OrderPayload
{
    public class OrderChangePaymentStatePayload
    {
        public int orderId { get; set; }
        public PaymentStatus paymentStatus { get; set; }
    }
}
