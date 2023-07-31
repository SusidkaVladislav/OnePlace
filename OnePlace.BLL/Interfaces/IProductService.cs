using OnePlace.BLL.Utilities;
using OnePlace.BOL.ProductDTO;
using OnePlace.BOL.ProductPayload;

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

        Task<int> AddProduct(ProductCreatePayload product);
        Task<int> UpdateProduct(ProductPayload product);
        Task<int> DeleteProduct(int productId);
    }
}
