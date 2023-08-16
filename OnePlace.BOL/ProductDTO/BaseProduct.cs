using OnePlace.BOL.Sale;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OnePlace.BOL.ProductDTO
{
    public abstract class BaseProduct
    {
        public string Code { get; set; }
        public string Name { get; set; }
        public decimal Price { get; set; }
        public int ManufacturerCountryId { get; set; }
        public int ManufacturerId { get; set; }
        public int MaterialId { get; set; }
        public int ColorId { get; set; }
        public int GenderId { get; set; }
        public int CategoryId { get; set; }
        public bool IsInBestProducts { get; set; } = false;
        public string Description { get; set; }
    }
}
