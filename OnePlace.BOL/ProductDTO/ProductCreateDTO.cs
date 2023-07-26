
using OnePlace.BOL.DescriptionDTO;
using OnePlace.BOL.DetailDTO;

namespace OnePlace.BOL.ProductDTO
{
    public class ProductCreateDTO
    {
        public string Name { get; set; } = string.Empty;
        public string Code { get; set; } = string.Empty;
        public float Price { get; set; }
        public int? ManufacturerCountryId { get; set; }
        public int? ManufacturerId { get; set; }
        public int? MaterialId { get; set; }
        public int? ColorId { get; set; }
        public int? GenderId { get; set; }
        public int CategoryId { get; set; }
        public HashSet<ProductDescription> Descriptions { get; set; }
        public HashSet<string> Pictures { get; set; }
        public string Description { get; set; } = string.Empty;
        public bool IsInBestProducts { get; set; } = false;
    }
}
