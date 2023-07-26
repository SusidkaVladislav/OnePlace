using AutoMapper.Configuration.Conventions;
using OnePlace.BLL.Utilities;
using OnePlace.BOL.ProductDTO;
using OnePlace.BOL.ProductPayload;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OnePlace.BLL.Interfaces
{
    public interface IProductService
    {
        Task<ProductDetails> GetProduct(int productId);

        /// <summary>
        /// Універсальний метод який приймає будь-яку кількість параметрів за якими фільтруютсья продукти
        /// </summary>
        /// <param name="filters"></param>
        /// <returns></returns>
        Task<List<ProductDetails>> FilterProduct(ProductSearchParams filters);

        Task<ProductDetails> AddProduct(ProductCreatePayload product);
        Task<ProductDetails> UpdateProduct(ProductPayload product);
        Task<ProductDetails> DeleteProduct(int productId);
    }
}
