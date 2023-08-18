using OnePlace.BOL.Description;
using OnePlace.BOL.Picture;
using OnePlace.BOL.Sale;
using OnePlace.BOL.Warehouse;

namespace OnePlace.BOL.ProductDTO
{
    public class ProductUpdateDTO: BaseProduct
    {
        public int Id { get; set; }
        public WarehouseDetails Warehouse { get; set; }
        public SaleDetails? Sale { get; set; }
        public List<ProductDescriptionDetails>? Descriptions { get; set; }
        public List<ProductPictureDetails> Pictures { get; set; }
    }
}