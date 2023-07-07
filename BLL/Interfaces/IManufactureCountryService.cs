using DTO.ManufactureCountry;
using DTO.Sale;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Interfaces
{
    public interface IManufactureCountryService
    {
        Task<List<ManufactureCountryDTO>> GetManufactureCountriesAsync();
        Task<ManufactureCountryDTO> GetManufactureCountryByIdAsync(long id);
        Task<ManufactureCountryDTO> AddManufactureCountryAsync(ManufactureCountryToAddDTO manufactureCountryToAdd);
        Task<ManufactureCountryDTO> UpdateManufactureCountryAsync(ManufactureCountryDTO manufactureCountryDTO);
        Task DeleteManufactureCountryAsync(long id);
    }
}
