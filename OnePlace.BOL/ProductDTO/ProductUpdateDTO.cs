using OnePlace.BOL.Description;
using OnePlace.BOL.Picture;
using OnePlace.BOL.Sale;


namespace OnePlace.BOL.ProductDTO
{
    public class ProductUpdateDTO: BaseProduct
    {
        public int Id { get; set; }
        public SaleDetails? Sale { get; set; }
        public List<ProductDescriptionDetails>? Descriptions { get; set; }
        public List<ProductPictureDetails> Pictures { get; set; }
    }
}