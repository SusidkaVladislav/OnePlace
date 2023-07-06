using BLL.Interfaces;
using DTO.LikedProduct;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.LogicServices
{
    public class LikedProductService : ILikedProductService
    {
        public async Task<LikedProductDTO> AddLikedProductAsync(LikedProductDTO likedProductToAdd)
        {
            throw new NotImplementedException();
        }

        public async Task DeleteLikedProductAsync(long id)
        {
            throw new NotImplementedException();
        }

        public async Task<LikedProductDTO> GetLikedProductByIdAsync(long id)
        {
            throw new NotImplementedException();
        }

        public async Task<List<LikedProductDTO>> GetLikedProductsAsync()
        {
            throw new NotImplementedException();
        }

        public async Task<LikedProductDTO> UpdateLikedProductAsync(LikedProductDTO likedProductDTO)
        {
            throw new NotImplementedException();
        }
    }
}
