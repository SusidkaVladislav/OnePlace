using BLL.Interfaces;
using DTO.Manufacturer;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.LogicServices
{
    public class ManufacturerService : IManufacturerService
    {
        public async Task<ManufacturerDTO> AddManufacturerAsync(ManufacturerToAddDTO manufacturerToAdd)
        {
            throw new NotImplementedException();
        }

        public async Task DeleteManufacturerAsync(long id)
        {
            throw new NotImplementedException();
        }

        public async Task<ManufacturerDTO> GetManufacturerByIdAsync(long id)
        {
            throw new NotImplementedException();
        }

        public async Task<List<ManufacturerDTO>> GetManufacturersAsync()
        {
            throw new NotImplementedException();
        }

        public async Task<ManufacturerDTO> UpdateManufacturerAsync(ManufacturerDTO manufacturerDTO)
        {
            throw new NotImplementedException();
        }
    }
}
