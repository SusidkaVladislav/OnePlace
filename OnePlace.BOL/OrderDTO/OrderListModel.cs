namespace OnePlace.BOL.OrderDTO
{
    public class OrderListModel
    {
        public int Id { get; set; }
        public string Initials { get; set; }
        public int OrderNumber { get; set; }
        public decimal TotalPrice { get; set; }
        public string PaymentStatus { get; set; }
        public string OrderStatus { get; set; }
    }
}
