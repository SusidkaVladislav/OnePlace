using OnePlace.BLL.Utilities;
using OnePlace.BOL.ProductDTO;
using OnePlace.BOL.ProductPayload;

namespace OnePlace.BLL.Interfaces
{
    public interface IProductService
    {
        /// <summary>
        /// Повертає один продукт за ідентифікатором
        /// </summary>
        /// <param name="productId"></param>
        /// <returns></returns>
        Task<ProductDetails> GetProduct(int productId);

        /// <summary>
        /// Універсальний метод який приймає будь-яку кількість параметрів за якими фільтруютсья продукти
        /// </summary>
        /// <param name="filters"></param>
        /// <returns></returns>
        Task<PaginatedList<ProductDetails>> FilterProduct(ProductSearchParams filters);

        /// <summary>
        /// Створити новий товар
        /// </summary>
        /// <param name="product"></param>
        /// <returns></returns>
        Task<int> AddProduct(ProductCreatePayload product);

        /// <summary>
        /// Редагувати товар
        /// </summary>
        /// <param name="product"></param>
        /// <returns></returns>
        Task<int> UpdateProduct(ProductPayload product);

        /// <summary>
        /// Видалити товар
        /// </summary>
        /// <param name="productId"></param>
        /// <returns></returns>
        Task<int> DeleteProduct(int productId);
    }
}
