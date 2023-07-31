using AutoMapper;
using Microsoft.Extensions.Logging;
using OnePlace.BLL.Interfaces;
using OnePlace.BLL.Utilities;
using OnePlace.BOL.ProductDTO;
using OnePlace.BOL.ProductPayload;


namespace OnePlace.BLL.Services
{
    public class ProductService : IProductService
    {
        private readonly IMapper _mapper;
        private readonly ILogger<ProductService> _logger;



        //Dependency injection of repository

        public ProductService(IMapper mapper, 
            ILogger<ProductService> logger)
        {
            _mapper = mapper;
            _logger = logger;
        }

        public Task<List<ProductDetails>> FilterProduct(ProductSearchParams filters)
        {
            throw new ArgumentNullException();
        }

        public async Task<int> AddProduct(ProductCreatePayload product)
        {
           

            if (product == null)
                throw new ArgumentNullException(nameof(product));

            //Тип-посередник
            ProductDTO productDTO = _mapper.Map<ProductDTO>(product);

            if (productDTO.CategoryId <= 0)
                throw new ArgumentNullException(nameof(product));

            //Перевірити чи є категорія за вказаним id
            //var category = _productRepository.GetCategory(productDTO.CategoryId);
            //if(category == null)
                //throw new ArgumentNullException(nameof(product));

            if(productDTO.ManufacturerId > 0)
            {
                //var manufacturer = 
            }

            throw new NotImplementedException();
        }

        public async Task<int> DeleteProduct(int productId)
        {
            throw new NotImplementedException();
        }

        public async Task<ProductDetails> GetProduct(int productId)
        {
            //_logger.LogInformation("Створюємо продукт");
            //throw new ValidationException(nameof(ProductDTO.CategoryId), "Товари з росії заборонені", "Ця категорія ще не доступна");
            //throw new NotFoundException(productId, nameof(ProductDetails));
            throw new NotImplementedException();
        }

        public async Task<int> UpdateProduct(ProductPayload product)
        {
            throw new NotImplementedException();
        }
    }
}
