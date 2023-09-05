namespace OnePlace.DAL.Entities
{
    //[PrimaryKey(nameof(OrderId), nameof(ProductId), nameof(ColorId))]
    public class OrderProduct
    {
        public int OrderId { get; set; }
        public Order Order { get; set; }
        public int ProductId { get; set; }
        public Product Product { get; set; }
        public int ColorId { get; set; }
        public Color Color { get; set; }
        public int Quantity { get; set; }
        public decimal Price { get; set; }
    }
}
