namespace OnePlace.BOL.ProductPayload
{
    public class PayloadGetRecommendedProducts
    {
        public int? CategoryId { get; set; }
        public int Quantity { get; set; }
        public int Skip { get; set; }
    }
}
