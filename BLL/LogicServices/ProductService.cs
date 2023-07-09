using BLL.Interfaces;
using DTO.Product;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.LogicServices
{
    public class ProductService : IProductService
    {
        public async Task<ProductDTO> AddProductAsync(ProductToAddDTO productToAdd)
        {
            throw new NotImplementedException();
        }

        public async Task DeleteProductAsync(long id)
        {
            throw new NotImplementedException();
        }

        public async Task<ProductDTO> GetProductByIdAsync(long id)
        {
            throw new NotImplementedException();
        }

        public async Task<List<ProductDTO>> GetProductsAsync()
        {
            throw new NotImplementedException();
        }

        public async Task<ProductDTO> UpdateProductAsync(ProductDTO productDTO)
        {
            throw new NotImplementedException();
        }
    }
}
