using OnePlace.BOL.DescriptionDTO;
using OnePlace.BOL.Picture;
using OnePlace.BOL.Sale;
using OnePlace.BOL.Warehouse;

namespace OnePlace.BOL.ProductDTO
{
    public class ProductCreateDTO: BaseProduct
    {
        public WarehouseDTO Warehouse { get; set; } 
        public SaleDTO? Sale { get; set; }
        public List<ProductDescriptionDTO> Descriptions { get; set; }
        public List<ProductPictureDTO> Pictures { get; set; }
    }
}
