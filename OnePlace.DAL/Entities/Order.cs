using Microsoft.EntityFrameworkCore;
using OnePlace.DAL.Enums;

namespace OnePlace.DAL.Entities
{
    public class Order
    {
        public int Id { get; set; }
        public int Number { get; set; }
        public string? Comment { get; set; }
        public OrderState State { get; set; }
        public DateTime Date { get; set; }
        public PaymentStatus PaymentStatus { get; set; }
        public PaymentMethod PaymentMethod { get; set; }
        
        [DeleteBehavior(DeleteBehavior.SetNull)]
        public User? User {get;set;}
        public int? UserId { get; set; }
        public string PhoneNumber { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string DeliveryInfo { get; set; }
        public string? SessionId { get; set; }
        public string? PaymentIntentId { get; set; }
        public ICollection<OrderProduct> OrderProducts { get; set; } = new List<OrderProduct>();
    }
}
