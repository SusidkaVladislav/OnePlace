
namespace OnePlace.BOL.OrderDTO
{
    public class OrderCreateDTO
    {
        public string OrderNumber { get; set; }
        public int UserId { get; set; }
        public int DeliveryId { get; set; }
        public string Comment { get; set; }
        public string State { get; set; }
        public DateTime Date { get; set; }
    }
}
