using OnePlace.BOL.DeliveryDTO;
using OnePlace.BOL.Enums;
using OnePlace.BOL.User;

namespace OnePlace.BOL.OrderDTO
{
    public class OrderDetails
    {
        public int Id { get; set; }
        
        public int OrderNumber { get; set; }
        
        public int UserId { get; set; }

        public UserDetails User { get; set; }

        public int DeliveryId { get; set; }
        
        public DeliveryDetails Delivery { get; set; }
        
        public string Comment { get; set; }
        
        public OrderState State { get; set; }
        
        public DateTime Date { get; set; }
    }
}
