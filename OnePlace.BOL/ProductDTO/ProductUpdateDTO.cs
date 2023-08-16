using OnePlace.BOL.Description;
using OnePlace.BOL.Picture;
using OnePlace.BOL.Sale;
using OnePlace.BOL.Warehouse;

namespace OnePlace.BOL.ProductDTO
{
    public class ProductUpdateDTO: BaseProduct
    {
        public int Id { get; set; }
        //public string Code { get; set; }
        //public string Name { get; set; }
        //public decimal Price { get; set; }
        //public int ManufacturerCountryId { get; set; }
        //public int ManufacturerId { get; set; }
        //public int MaterialId { get; set; }
        //public int ColorId { get; set; }
        //public int GenderId { get; set; }
        //public string Description { get; set; }
        //public int CategoryId { get; set; }
        //public bool IsInBestProducts { get; set; }
        public WarehouseDetails Warehouse { get; set; }
        public SaleDetails? Sale { get; set; }
        public List<ProductDescriptionDetails>? Descriptions { get; set; }
        public List<ProductPictureDetails> Pictures { get; set; }
    }
}