using DTO.Delivery;
using DTO.LikedProduct;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Interfaces
{
    public interface ILikedProductService
    {
        Task<List<LikedProductDTO>> GetLikedProductsAsync();
        Task<LikedProductDTO> GetLikedProductByIdAsync(long id);
        Task<LikedProductDTO> AddLikedProductAsync(LikedProductDTO likedProductToAdd);
        Task<LikedProductDTO> UpdateLikedProductAsync(LikedProductDTO likedProductDTO);
        Task DeleteLikedProductAsync(long id);
    }
}