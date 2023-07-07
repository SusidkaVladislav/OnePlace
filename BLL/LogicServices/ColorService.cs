using BLL.Interfaces;
using DTO.Color;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.LogicServices
{
    public class ColorService : IColorService
    {
        public async Task<ColorDTO> AddColorAsync(ColorToAddDTO colorToAdd)
        {
            throw new NotImplementedException();
        }

        public async Task DeleteColorAsync(long id)
        {
            throw new NotImplementedException();
        }

        public async Task<ColorDTO> GetColorByIdAsync(long id)
        {
            throw new NotImplementedException();
        }

        public async Task<List<ColorDTO>> GetColorsAsync()
        {
            throw new NotImplementedException();
        }

        public async Task<ColorDTO> UpdateColorAsync(ColorDTO colorDTO)
        {
            throw new NotImplementedException();
        }
    }
}
