namespace OnePlace.BOL.ProductDTO
{
    public class GetRecommendedProductsDTO
    {
        public int? CategoryId { get; set; }
        public int Quantity { get; set; }
        public int Skip { get; set; }
    }
}
