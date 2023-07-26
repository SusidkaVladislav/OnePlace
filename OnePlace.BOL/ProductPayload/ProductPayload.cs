using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OnePlace.BOL.ProductPayload
{
    public class ProductPayload
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Code { get; set; } = string.Empty;
        public float Price { get; set; }
        public int? ManufacturerCountryId { get; set; }
        public int? ManufacturerId { get; set; }
        public int? MaterialId { get; set; }
        public int? ColorId { get; set; }
        public int? GenderId { get; set; }
        public int CategoryId { get; set; }
        public string Description { get; set; } = string.Empty;
        public bool IsInBestProducts { get; set; }
    }
}
