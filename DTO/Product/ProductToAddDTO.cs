using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO.Product
{
    public class ProductToAddDTO
    {
        public string Code { get; set; } = "";
        public string Name { get; set; } = "";
        public float Price { get; set; }
        public string Description { get; set; } = "";
        public int ManufactureCountryId { get; set; }
        public long ManufacturerId { get; set; }
        public long MaterialId { get; set; }
        public int ColorId { get; set; }
        public int GenderId { get; set; }
        public long ThirdLevelCategoryId { get; set; }
        public bool IsInBestProducts { get; set; }
    }
}
