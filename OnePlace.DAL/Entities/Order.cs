using OnePlace.DAL.Enums;

namespace OnePlace.DAL.Entities
{
    public class Order
    {
        public int Id { get; set; }
        public int OrderNumber { get; set; }
        public string Comment { get; set; }
        public OrderState State { get; set; }
        public DateTime Date { get; set; }
        public User User {get;set;}
        public int UserId { get; set; }
        public int DeliveryId { get; set; }
        public Delivery Delivery { get; set; }
        public string DeliveryInfo { get; set; }
    }
}
