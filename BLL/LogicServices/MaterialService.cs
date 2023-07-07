using BLL.Interfaces;
using DTO.Material;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.LogicServices
{
    public class MaterialService : IMaterialService
    {
        public async Task<MaterialDTO> AddMaterialAsync(MaterialToAddDTO materialToAdd)
        {
            throw new NotImplementedException();
        }

        public async Task DeleteMaterialAsync(long id)
        {
            throw new NotImplementedException();
        }

        public async Task<List<MaterialDTO>> GetMaterialAsync()
        {
            throw new NotImplementedException();
        }

        public async Task<MaterialDTO> GetMaterialByIdAsync(long id)
        {
            throw new NotImplementedException();
        }

        public async Task<MaterialDTO> UpdateMaterialAsync(MaterialDTO materialDTO)
        {
            throw new NotImplementedException();
        }
    }
}
