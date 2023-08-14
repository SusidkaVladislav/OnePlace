namespace OnePlace.BOL.ProductDTO
{
    public class ProductListModel
    {
        public int Id { get; set; }
        public string Picture { get; set; }
        public bool IsInLiked { get; set; }
        public string Name { get; set; }
        public string Location { get; set; }
        public decimal Price { get; set; }
        public bool IsInCart { get; set; }
    }
}
