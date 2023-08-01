using Microsoft.EntityFrameworkCore;

namespace OnePlace.DAL.Entities
{
    [PrimaryKey(nameof(WarehouseId), nameof(ProductId))]
    public class WarehouseProduct
    {
        public int WarehouseId { get; set; }
        public Warehouse Warehouse { get; set; }
        public int ProductId { get; set; }
        public Product Product { get; set; }
        public int Quantity { get; set; }
    }
}
