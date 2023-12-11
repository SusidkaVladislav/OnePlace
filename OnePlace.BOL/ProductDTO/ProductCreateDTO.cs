using OnePlace.BOL.DescriptionDTO;
using OnePlace.BOL.Picture;
using OnePlace.BOL.ProductColor;
using OnePlace.BOL.Sale;

namespace OnePlace.BOL.ProductDTO
{
    public class ProductCreateDTO : BaseProduct
    {
        public int CategoryId { get; set; }
        public SaleDTO? Sale { get; set; }
        public List<ProductDescriptionDTO>? Descriptions { get; set; }
        public List<ProductPictureDTO> Pictures { get; set; }
        public List<ProductColorDTO> ProductColors { get; set; }
    }
}
