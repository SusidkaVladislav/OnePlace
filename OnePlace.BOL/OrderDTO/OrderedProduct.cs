namespace OnePlace.BOL.OrderDTO
{
    public class OrderedProduct
    {
        public int Id { get; set; }
        public int ColorId { get; set; }
        public string Name { get; set; }
        public string Picture { get; set; }
        public int Quantity { get; set; }
        public decimal Price { get; set; }
    }
}
