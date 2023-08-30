namespace OnePlace.DAL.Entities
{
    public class ProductColor
    {
        public int ProductId { get; set; }
        public Product Product { get; set; }
        public int ColorId { get; set; }
        public Color Color { get; set; }
        public decimal Price { get; set; }
        public int Quantity { get; set; }
    }
}
