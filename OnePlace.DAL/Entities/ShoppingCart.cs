namespace OnePlace.DAL.Entities
{
    //[PrimaryKey(nameof(ProductId), nameof(UserId), nameof(ColorId))]
    public class ShoppingCart
    {
        public int ProductId { get; set; }
        public Product Product { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }
        public int ColorId { get; set; }
        public Color Color { get; set; }
        public int Quantity { get; set; }
    }
}
