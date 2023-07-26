using AutoMapper;
using Microsoft.EntityFrameworkCore.Infrastructure;
using OnePlace.BLL.Interfaces;
using OnePlace.BLL.Utilities;
using OnePlace.BOL.ProductDTO;
using OnePlace.BOL.ProductPayload;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OnePlace.BLL.Services
{
    public class ProductService : IProductService
    {
        private readonly IMapper _mapper;
        public ProductService(IMapper mapper)
        {
            _mapper = mapper;
        }

        public Task<List<ProductDetails>> FilterProduct(ProductSearchParams filters)
        {
            throw new ArgumentNullException();
        }

        public async Task<ProductDetails> AddProduct(ProductCreatePayload product, int categoryId)
        {
            if (product == null)
                throw new ArgumentNullException(nameof(product));

            //Тип-посередник
            ProductDTO productDTO = _mapper.Map<ProductDTO>(product);

          
            throw new NotImplementedException();
        }

        public async Task<ProductDetails> DeleteProduct(int productId)
        {
            throw new NotImplementedException();
        }

        public async Task<ProductDetails> GetProduct(int productId)
        {
            throw new NotImplementedException();
        }

        public async Task<ProductDetails> UpdateProduct(ProductPayload product)
        {
            throw new NotImplementedException();
        }
    }
}
