using DTO.SecondLevelCategory;
using DTO.WarehouseProduct;
using DTO.Warehouse;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Interfaces
{
    public interface IWarehouseProductService
    {
        Task<List<WarehouseProductDTO>> GetWarehouseProductsAsync();
        Task<WarehouseProductDTO> GetWarehouseProductByIdAsync(long id);
        Task<WarehouseProductDTO> AddWarehouseProductAsync(WarehouseProductDTO warehouseProduct);
        Task<WarehouseProductDTO> UpdateWarehouseProductAsync(WarehouseProductDTO warehouseProduct);
        Task DeleteWarehouseProductAsync(long id);
    }
}
