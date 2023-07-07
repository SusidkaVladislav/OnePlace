using DTO.Manufacturer;
using DTO.Sale;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Interfaces
{
    public interface IManufacturerService
    {
        Task<List<ManufacturerDTO>> GetManufacturersAsync();
        Task<ManufacturerDTO> GetManufacturerByIdAsync(long id);
        Task<ManufacturerDTO> AddManufacturerAsync(ManufacturerToAddDTO manufacturerToAdd);
        Task<ManufacturerDTO> UpdateManufacturerAsync(ManufacturerDTO manufacturerDTO);
        Task DeleteManufacturerAsync(long id);
    }
}
