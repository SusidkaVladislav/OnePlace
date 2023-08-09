using AutoMapper;
using Microsoft.Extensions.Logging;
using OnePlace.BLL.Interfaces;
using OnePlace.BLL.Utilities;
using OnePlace.BOL.DescriptionDTO;
using OnePlace.BOL.Exceptions;
using OnePlace.BOL.Picture;
using OnePlace.BOL.ProductDTO;
using OnePlace.BOL.ProductPayload;
using OnePlace.DAL.Entities;
using OnePlace.DAL.Interfaces;

namespace OnePlace.BLL.Services
{
    public class ProductService : IProductService
    {
        private readonly IMapper _mapper;
        private readonly ILogger<ProductService> _logger;
        private IUnitOfWork _unitOfWork;


        //Dependency injection of repository

        public ProductService(IMapper mapper, 
            ILogger<ProductService> logger,
            IUnitOfWork unitOfWork)
        {
            _mapper = mapper;
            _logger = logger;
            _unitOfWork = unitOfWork;
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
            ProductCreateDTO productDTO = _mapper.Map<ProductCreateDTO>(product);

            #region Валідація всіх полів
            #region Category
            if (productDTO.CategoryId <= 0)
                throw new ArgumentNullException(nameof(product) + " no categiry ID");
            //Перевірити чи є категорія за вказаним id
            var category = await _unitOfWork.Categories.GetAsync(productDTO.CategoryId);
            if (category == null)
                throw new ArgumentNullException(nameof(product) + " invalid category ID");
            #endregion
            #region Manufacturer country
            if (productDTO.ManufacturerCountryId <= 0)
                throw new ArgumentNullException(nameof(product) + " invalid manufacturer country ID");
            var country = await _unitOfWork.ManufactureCountries.GetAsync(productDTO.ManufacturerCountryId ?? default(int));
            if(country == null)
                throw new ArgumentNullException(nameof(product) + " invalid manufacturer country ID");
            #endregion
            #region Manufacturer
            if (productDTO.ManufacturerId <= 0)
                throw new ArgumentNullException(nameof(product) + " invalid manufacturer ID");
            var manufacturer = await _unitOfWork.Manufacturers.GetAsync(productDTO.ManufacturerId ?? default(int));
            if (manufacturer == null)
                throw new ArgumentNullException(nameof(product) + " invalid manufacturer ID");
            #endregion
            #region Material
            if (productDTO.MaterialId <= 0)
                throw new ArgumentNullException(nameof(product) + " invalid material ID");
            var material = await _unitOfWork.Materials.GetAsync(productDTO.MaterialId ?? default(int));
            if (material == null)
                throw new ArgumentNullException(nameof(product) + " invalid material ID");
            #endregion
            #region Color
            if (productDTO.ColorId <= 0)
                throw new ArgumentNullException(nameof(product) + " invalid color ID");
            var color = await _unitOfWork.Colors.GetAsync(productDTO.ColorId ?? default(int));
            if (color == null)
                throw new ArgumentNullException(nameof(product) + " invalid color ID");
            #endregion
            #region Gender
            if (productDTO.GenderId <= 0)
                throw new ArgumentNullException(nameof(product) + " invalid gender ID");
            var gender = await _unitOfWork.Genders.GetAsync(productDTO.GenderId ?? default(int));
            if (gender == null)
                throw new ArgumentNullException(nameof(product) + " invalid gender ID");
            #endregion
            #endregion

            Product newProduct = _mapper.Map<Product>(productDTO);

            #region Робота з фотографіями

            List<ProductPictureDTO> productPictureDTOs = productDTO.Pictures;
            List<int> picturesIds = new List<int>();

            foreach (ProductPictureDTO picture in productPictureDTOs)
            {
                IEnumerable<Picture> existedPictures = await _unitOfWork.Pictures.FindAsync(
                    p => p.Address == picture.Address
                    );

                if(existedPictures.Count() == 0)
                {
                    Picture newPicture = new Picture();
                    newPicture.Address = picture.Address;

                    _unitOfWork.Pictures.Create(newPicture);
                    await _unitOfWork.SaveAsync();

                    picturesIds.Add(newPicture.Id);
                }
                else
                {
                    picturesIds.Add(existedPictures.First().Id);
                }
            }

            ICollection<ProductPicture> productPictures = new List<ProductPicture>();

            for (int i = 0; i < picturesIds.Count; i++)
            {
                ProductPicture picture = new ProductPicture();
                picture.ProductId = newProduct.Id;
                picture.PictureId = picturesIds[i];
                picture.IsTitle = productPictureDTOs[i].IsTitle;
                productPictures.Add(picture);
            }

            newProduct.ProductPictures = productPictures;

            #endregion

            #region Робота з характеристиками продукту    
            List<ProductDescriptionDTO> descriptionsDTO = productDTO.Descriptions;
            
            //Список всіх ідентифікаторів характеристик, які відносяться до даного продукта
            List<int> descriptionsIds= new List<int>();

            //Перебираю всі характеристика
            foreach (ProductDescriptionDTO description in descriptionsDTO)
            {
                //Пошук характеристики з відповідним описом
                IEnumerable<Description> existedDescriptions = await _unitOfWork.Descriptions.FindAsync(
                    d => d.CategoryId == productDTO.CategoryId && 
                    d.Name.Trim().ToLower() == description.Name.Trim().ToLower());
                
                //Якщо немає, то створюємо нову характеристику
                if (existedDescriptions.Count() == 0)
                {
                    //Створення нової характеристики
                    Description newDescription = new Description();
                    newDescription.Name = description.Name;
                    newDescription.CategoryId = productDTO.CategoryId;

                    //Збереження в БД
                    _unitOfWork.Descriptions.Create(newDescription);
                    await _unitOfWork.SaveAsync();

                    descriptionsIds.Add(newDescription.Id);
                }
                //Збереження ідентивікатора вже існуючої характеристики
                else
                {
                    descriptionsIds.Add(existedDescriptions.First().Id);
                }
            }

            
            ICollection<ProductDescription> productDescriptions = new List<ProductDescription>();

            for (int i = 0; i < descriptionsIds.Count; i++)
            {
                ProductDescription description = new ProductDescription();
                description.DescriptionId = descriptionsIds[i];
                description.ProductId = newProduct.Id;
                description.About = descriptionsDTO[i].About;
                productDescriptions.Add(description);
            }

            newProduct.ProductDescriptions = productDescriptions;
            #endregion

            //Добавлення нового продукту в БД
            _unitOfWork.Products.Create(newProduct);
            await _unitOfWork.SaveAsync();

            return newProduct.Id;
        }

        public async Task<int> DeleteProduct(int productId)
        {
            throw new NotImplementedException();
        }

        public async Task<ProductDetails> GetProduct(int productId)
        {
            if(productId <= 0)
                throw new ArgumentNullException(nameof(productId) + " is invalid");
            
            var product = await _unitOfWork.Products.GetAsync(productId);

            if(product == null)
            {
                throw new NotFoundException(nameof(product) + " No product with this ID!");
            }

            ProductDetails details = _mapper.Map<ProductDetails>(product);

            for (int i = 0; i < details.Descriptions.Count; i++)
            {
                var desc = await _unitOfWork.Descriptions.GetAsync(
                    product.ProductDescriptions.ElementAt(i).DescriptionId);
                details.Descriptions[i].Name = desc.Name;
            }

            for (int i = 0; i < details.Pictures.Count; i++)
            {
                var pict = await _unitOfWork.Pictures.GetAsync(
                    product.ProductPictures.ElementAt(i).PictureId);
                details.Pictures[i].Address = pict.Address;
            }

            return details;

            //_logger.LogInformation("Створюємо продукт");
            //throw new ValidationException(nameof(ProductDTO.CategoryId), "Товари з росії заборонені", "Ця категорія ще не доступна");
            //throw new NotFoundException(productId, nameof(ProductDetails));
            //throw new NotImplementedException();
        }

        public async Task<int> UpdateProduct(ProductPayload product)
        {
            throw new NotImplementedException();
        }
    }
}
