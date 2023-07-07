using DTO.Color;
using DTO.Delivery;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Interfaces
{
    public interface IColorService
    {
        Task<List<ColorDTO>> GetColorsAsync();
        Task<ColorDTO> GetColorByIdAsync(long id);
        Task<ColorDTO> AddColorAsync(ColorToAddDTO colorToAdd);
        Task<ColorDTO> UpdateColorAsync(ColorDTO colorDTO);
        Task DeleteColorAsync(long id);
    }
}
