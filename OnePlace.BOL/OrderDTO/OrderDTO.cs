using OnePlace.BOL.Enums;

namespace OnePlace.BOL.OrderDTO
{
    public class OrderDTO
    {
        public int Id { get; set; }
        public int OrderNumber { get; set; }
        public int UserId { get; set; }
        public int DeliveryId { get; set; }
        public string Comment { get; set; }
        public OrderStates State { get; set; }
        public DateTime Date { get; set; }
    }
}
