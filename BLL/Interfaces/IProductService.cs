using DTO.Product;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Interfaces
{
    public interface IProductService
    {
        Task<List<ProductDTO>> GetProductsAsync();
        Task<ProductDTO> GetProductByIdAsync(long id);
        Task<ProductDTO> AddProductAsync(ProductToAddDTO productToAdd);
        Task<ProductDTO> UpdateProductAsync(ProductDTO productDTO);
        Task DeleteProductAsync(long id);
    }
}