using BLL.Interfaces;
using DTO.ManufactureCountry;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.LogicServices
{
    public class ManufactureCountryService : IManufactureCountryService
    {
        public async Task<ManufactureCountryDTO> AddManufactureCountryAsync(ManufactureCountryToAddDTO manufactureCountryToAdd)
        {
            throw new NotImplementedException();
        }

        public async Task DeleteManufactureCountryAsync(long id)
        {
            throw new NotImplementedException();
        }

        public async Task<List<ManufactureCountryDTO>> GetManufactureCountriesAsync()
        {
            throw new NotImplementedException();
        }

        public async Task<ManufactureCountryDTO> GetManufactureCountryByIdAsync(long id)
        {
            throw new NotImplementedException();
        }

        public async Task<ManufactureCountryDTO> UpdateManufactureCountryAsync(ManufactureCountryDTO manufactureCountryDTO)
        {
            throw new NotImplementedException();
        }
    }
}
