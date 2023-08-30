using OnePlace.DAL.Enums;

namespace OnePlace.DAL.Entities
{
    public class Order
    {
        public int Id { get; set; }
        public string Comment { get; set; }
        public OrderState State { get; set; }
        public DateTime Date { get; set; }
        public PaymentStatus PaymentStatus { get; set; }
        public User User {get;set;}
        public int UserId { get; set; }
        public string DeliveryInfo { get; set; }
        public string SessionId { get; set; }
        public string PaymentIntentId { get; set; }
    }
}
