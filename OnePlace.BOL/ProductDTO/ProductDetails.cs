using OnePlace.BOL.CategoryPayload;
using OnePlace.BOL.Description;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OnePlace.BOL.ProductDTO
{
    public class ProductDetails
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Code { get; set; } = string.Empty;
        public float Price { get; set; }
        public int? ManufacturerCountryId { get; set; }
        public ManufacturerCountryDTO? ManufacturerCountry { get; set; }
        public int? ManufacturerId { get; set; }
        public ManufacturerDTO? Manufacturer { get; set; }
        public int? MaterialId { get; set; }
        public MaterialDTO? Material { get; set; }
        public int? ColorId { get; set; }
        public ColorDTO? Color { get; set; }
        public int? GenderId { get; set; }
        public GenderDTO? Gender { get; set; }
        public int CategoryId { get; set; }
        public CategoryToReturnPayload Category { get; set; } = new CategoryToReturnPayload();
        public string Description { get; set; } = string.Empty;
        public bool IsInBestProducts { get; set; } = false;
        public HashSet<ProductDescriptionDetails> Descriptions { get; set; }
    }
}
