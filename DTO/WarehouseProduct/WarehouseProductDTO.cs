using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO.WarehouseProduct
{
    public class WarehouseProductDTO
    {
        public long WarehouseId { get; set; }   
        public long ProductId { get; set; }
        public int Quantity { get; set; }
    }
}
