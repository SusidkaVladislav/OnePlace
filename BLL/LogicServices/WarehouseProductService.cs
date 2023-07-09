using BLL.Interfaces;
using DTO.WarehouseProduct;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.LogicServices
{
    public class WarehouseProductService : IWarehouseProductService
    {
        public async Task<WarehouseProductDTO> AddWarehouseProductAsync(WarehouseProductDTO warehouseProduct)
        {
            throw new NotImplementedException();
        }

        public async Task DeleteWarehouseProductAsync(long id)
        {
            throw new NotImplementedException();
        }

        public async Task<WarehouseProductDTO> GetWarehouseProductByIdAsync(long id)
        {
            throw new NotImplementedException();
        }

        public async Task<List<WarehouseProductDTO>> GetWarehouseProductsAsync()
        {
            throw new NotImplementedException();
        }

        public async Task<WarehouseProductDTO> UpdateWarehouseProductAsync(WarehouseProductDTO warehouseProduct)
        {
            throw new NotImplementedException();
        }
    }
}
