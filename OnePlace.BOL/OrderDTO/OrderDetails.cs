namespace OnePlace.BOL.OrderDTO
{
    public class OrderDetails
    {
        public int Id { get; set; }
        
        public int Number { get; set; }
        
        public DateTime Date { get; set; }

        public string OrderState { get; set; }
        
        public string PaymentStatus { get; set; }

        public List<OrderedProduct> Products { get; set; } = new List<OrderedProduct>();

        public decimal TotalPrice { get; set; }

        public string DeliveryInfo { get; set; }

        public string UserInitials { get; set; }

        public string PhoneNumber { get; set; }

        public string? Email { get; set; }

        public string? Comment { get; set; }

        public string PaymentMethod { get; set; }

        public int? UserId { get; set; }
    }
}
