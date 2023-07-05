using DTO.Warehouse;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Interfaces
{
    public interface IWarehouseService
    {
        Task<List<WarehouseDTO>> GetWarehousesAsync();
        Task<WarehouseDTO> GetWarehouseByIdAsync(int id);
        Task<WarehouseDTO> AddWarehouseAsync(WarehouseDTO warehouse);
        Task<WarehouseDTO> UpdateWarehouseAsync(WarehouseDTO warehouseForUpdate);
        Task DeleteWarehouseAsync(int id);
    }
}
