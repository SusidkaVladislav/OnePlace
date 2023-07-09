using DTO.Material;
using DTO.Sale;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Interfaces
{
    public interface IMaterialService
    {
        Task<List<MaterialDTO>> GetMaterialsAsync();
        Task<MaterialDTO> GetMaterialByIdAsync(long id);
        Task<MaterialDTO> AddMaterialAsync(MaterialToAddDTO materialToAdd);
        Task<MaterialDTO> UpdateMaterialAsync(MaterialDTO materialDTO);
        Task DeleteMaterialAsync(long id);
    }
}
