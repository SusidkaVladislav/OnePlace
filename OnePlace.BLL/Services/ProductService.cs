using AutoMapper;
//using MailKit;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore.Internal;
using Microsoft.Extensions.Logging;
using OnePlace.BLL.Interfaces;
using OnePlace.BLL.Utilities;
using OnePlace.BLL.Validators;
using OnePlace.BOL;
using OnePlace.BOL.Description;
using OnePlace.BOL.DescriptionDTO;
using OnePlace.BOL.Exceptions;
using OnePlace.BOL.Picture;
using OnePlace.BOL.ProductDTO;
using OnePlace.BOL.ProductPayload;
using OnePlace.BOL.Sale;
using OnePlace.DAL.Entities;
using OnePlace.DAL.Interfaces;
using System.Collections.Generic;
using System.Drawing;

namespace OnePlace.BLL.Services
{
    /// <summary>
    /// Сервіс для роботи з продуктами
    /// </summary>
    public class ProductService : IProductService
    {
        private readonly IMapper _mapper;
        private readonly ILogger<ProductService> _logger;
        private IUnitOfWork _unitOfWork;
        private readonly UserManager<User> _userManager;
        private IHttpContextAccessor _httpContextAccessor;

        public ProductService(IMapper mapper,
            ILogger<ProductService> logger,
            IUnitOfWork unitOfWork,
            UserManager<User> userManager,
            IHttpContextAccessor httpContextAccessor)
        {
            _mapper = mapper;
            _logger = logger;
            _unitOfWork = unitOfWork;
            _userManager = userManager;
            _httpContextAccessor = httpContextAccessor;
        }

        /// <summary>
        /// Фільтрувати товари за переданими умовами
        /// </summary>
        /// <param name="filters"></param>
        /// <returns></returns>
        /// <exception cref="BusinessException"></exception>
        public async Task<PaginatedList<ProductListModel>> FilterProduct(ProductSearchParams filters)
        {
            if (filters.Category == 0)
                throw new BusinessException("Неіснуюча категорія");

            DAL.SearchParams.ProductSearchParams searchParams = _mapper.Map<DAL.SearchParams.ProductSearchParams>(filters);

            var products = await _unitOfWork.Products.Filter(searchParams);

            List<ProductListModel> productListModels = new List<ProductListModel>();

            //Отримання користувача
            var user = _httpContextAccessor.HttpContext.User.Claims.FirstOrDefault(c => c.Type == "UserId");

            //Перебір всіх з сторінки продуктів
            foreach (var product in products.Items)
            {
                //Створення моделі, яка представляє собою товар (головні характеристики)
                ProductListModel productListModel = new ProductListModel
                {
                    Id = product.Id,
                    Name = product.Name
                };

                productListModel.Price = product.ProductColors.First().Price;

                #region Головна фотографія
                var pictures = await _unitOfWork.Pictures.FindAsync(pp => pp.Id == product.ProductPictures
                .Where(p => p.IsTitle == true && p.ProductId == product.Id)
                    .Select(p => p.PictureId).FirstOrDefault());

                productListModel.Picture = pictures.Select(pp => pp.Address).FirstOrDefault();
                #endregion

                #region Чи є цей товар в улуюблених товарах користувача
                if (user is not null)
                {
                    var likedProducts = await _unitOfWork.LikedProducts.FindAsync(l => l.UserId == Int32.Parse(user.Value) &&
                    l.ProductId == product.Id);

                    productListModel.IsInLiked = likedProducts.Any();
                }
                else
                {
                    productListModel.IsInLiked = false;
                }

                #endregion

                #region Чи є цей товар в корзині користувача
                if (user is not null)
                {
                    var productsInCart = await _unitOfWork.ShoppingCarts.FindAsync(c => c.UserId == Int32.Parse(user.Value) &&
                    c.ProductId == product.Id);
                    productListModel.IsInCart = productsInCart.Any();
                }
                else
                {
                    productListModel.IsInCart = false;
                }
                #endregion

                #region Перевірка знижки
                var sale = await _unitOfWork.Sales.FindAsync(s => s.ProductId == product.Id);
                if (sale.Any())
                {
                    //Видалити якщо час знижки закінчився
                    if (sale.First().EndDate.Date <= DateTime.UtcNow.Date)
                    {
                        await _unitOfWork.Sales.DeleteAsync(sale.First().Id);
                        await _unitOfWork.SaveAsync();
                        productListModel.DiscountPercent = 0;
                    }
                    else
                        productListModel.DiscountPercent = sale.First().DiscountPercent;
                }
                else
                    productListModel.DiscountPercent = 0;
                #endregion

                #region Перевірка наявності
                var isInStock = product.ProductColors.Any(p => p.Quantity > 0);
                productListModel.IsInStock = isInStock;
                #endregion

                #region Отримання першрої фотографії товару
                productListModel.ColorId = product.ProductColors.FirstOrDefault().ColorId;
                #endregion

                productListModels.Add(productListModel);
            }


            //Створення пагінованого списку з продуктів
            var result = new PaginatedList<ProductListModel>
            {
                Items = productListModels,
                TotalCountFromPage = productListModels.Count,
                TotalCount = products.TotalCount,
            };

            return result;
        }

        /// <summary>
        /// Отримати рекомендовані товари
        /// </summary>
        /// <param name="getRecommendedProducts"></param>
        /// <returns></returns>
        public async Task<List<ProductListModel>> GetRecommendedProducts(PayloadGetRecommendedProducts getRecommendedProducts)
        {
            GetRecommendedProductsDTO filters = _mapper.Map<GetRecommendedProductsDTO>(getRecommendedProducts);

            List<ProductListModel> products = new List<ProductListModel>();
            
            //Отримання користувача
            var user = _httpContextAccessor.HttpContext.User.Claims.FirstOrDefault(c => c.Type == "UserId");

            IEnumerable<Product> productsByCategory = new List<Product>();

            if (filters.Skip < 0 || filters.Quantity < 0)
            {
                return products;
            }
            //Якщо потрібно повернути рекомендовані товари з конкретної категорії
            if(filters.CategoryId.HasValue)
            {
                //Якщо передано неіснуючу категорію, то повернути пустий масив
                if(filters.CategoryId.Value < 1)
                {
                    return products;
                }
                else
                {
                    productsByCategory = await _unitOfWork.Products
                        .FindAsync(p => p.IsInBestProducts == true && p.CategoryId == filters.CategoryId.Value);
                }
            }
            else
            {
                productsByCategory = await _unitOfWork.Products.FindAsync(p => p.IsInBestProducts == true);
            }

            //Якщо якісь продукти попали під фільтри (збирання всієї необхідної інформації про продукти)
            if (productsByCategory.Count() > 0)
            {
                int count = 0;
                foreach (var product in productsByCategory.Skip(filters.Skip))
                {
                    ProductListModel productListModel = new ProductListModel
                    {
                        Id = product.Id,
                        Name = product.Name,
                    };

                    productListModel.Price = product.ProductColors.First().Price;

                    #region Головна фотографія
                    var pictures = await _unitOfWork.Pictures.FindAsync(pp => pp.Id == product.ProductPictures
                    .Where(p => p.IsTitle == true && p.ProductId == product.Id)
                        .Select(p => p.PictureId).FirstOrDefault());

                    productListModel.Picture = pictures.Select(pp => pp.Address).FirstOrDefault();
                    #endregion

                    #region Чи є цей товар в улуюблених товарах користувача
                    if (user is not null)
                    {
                        var likedProducts = await _unitOfWork.LikedProducts.FindAsync(l => l.UserId == Int32.Parse(user.Value) &&
                        l.ProductId == product.Id);

                        productListModel.IsInLiked = likedProducts.Any();
                    }
                    else
                    {
                        productListModel.IsInLiked = false;
                    }

                    #endregion

                    #region Чи є цей товар в корзині користувача
                    if (user is not null)
                    {
                        var productsInCart = await _unitOfWork.ShoppingCarts.FindAsync(c => c.UserId == Int32.Parse(user.Value) &&
                        c.ProductId == product.Id);
                        productListModel.IsInCart = productsInCart.Any();
                    }
                    else
                    {
                        productListModel.IsInCart = false;
                    }
                    #endregion

                    #region Перевірка знижки
                    var sale = await _unitOfWork.Sales.FindAsync(s => s.ProductId == product.Id);
                    if (sale.Any())
                    {
                        //Видалити якщо час знижки закінчився
                        if (sale.First().EndDate.Date <= DateTime.UtcNow.Date)
                        {
                            await _unitOfWork.Sales.DeleteAsync(sale.First().Id);
                            await _unitOfWork.SaveAsync();
                            productListModel.DiscountPercent = 0;
                        }
                        else
                            productListModel.DiscountPercent = sale.First().DiscountPercent;
                    }
                    else
                        productListModel.DiscountPercent = 0;
                    #endregion

                    #region Перевірка наявності
                    var isInStock = product.ProductColors.Any(p => p.Quantity > 0);
                    productListModel.IsInStock = isInStock;
                    #endregion

                    #region Отримання першрої фотографії товару
                    productListModel.ColorId = product.ProductColors.FirstOrDefault().ColorId;
                    #endregion

                    products.Add(productListModel);

                    if (++count == filters.Quantity)
                    {
                        return products;
                    }
                }
            }
            
            return products;
        }


        /// <summary>
        /// Отримати всі рекомендовані товари
        /// </summary>
        /// <param name="getAllRecommendedProducts"></param>
        /// <returns></returns>
        public async Task<List<ProductListModel>> GetAllRecommendedProducts()
        {
            List<ProductListModel> products = new List<ProductListModel>();

            //Отримання користувача
            var user = _httpContextAccessor.HttpContext.User.Claims.FirstOrDefault(c => c.Type == "UserId");

            IEnumerable<Product> productsByCategory = new List<Product>();


            productsByCategory = await _unitOfWork.Products.FindAsync(p => p.IsInBestProducts == true);
                
            //Якщо якісь продукти попали під фільтри (збирання всієї необхідної інформації про продукти)
            if (productsByCategory.Count() > 0)
            {
                int count = 0;
                foreach (var product in productsByCategory)
                {
                    ProductListModel productListModel = new ProductListModel
                    {
                        Id = product.Id,
                        Name = product.Name,
                    };

                    productListModel.Price = product.ProductColors.First().Price;

                    #region Головна фотографія
                    var pictures = await _unitOfWork.Pictures.FindAsync(pp => pp.Id == product.ProductPictures
                    .Where(p => p.IsTitle == true && p.ProductId == product.Id)
                        .Select(p => p.PictureId).FirstOrDefault());

                    productListModel.Picture = pictures.Select(pp => pp.Address).FirstOrDefault();
                    #endregion

                    #region Чи є цей товар в улуюблених товарах користувача
                    if (user is not null)
                    {
                        var likedProducts = await _unitOfWork.LikedProducts.FindAsync(l => l.UserId == Int32.Parse(user.Value) &&
                        l.ProductId == product.Id);

                        productListModel.IsInLiked = likedProducts.Any();
                    }
                    else
                    {
                        productListModel.IsInLiked = false;
                    }

                    #endregion

                    #region Чи є цей товар в корзині користувача
                    if (user is not null)
                    {
                        var productsInCart = await _unitOfWork.ShoppingCarts.FindAsync(c => c.UserId == Int32.Parse(user.Value) &&
                        c.ProductId == product.Id);
                        productListModel.IsInCart = productsInCart.Any();
                    }
                    else
                    {
                        productListModel.IsInCart = false;
                    }
                    #endregion

                    #region Перевірка знижки
                    var sale = await _unitOfWork.Sales.FindAsync(s => s.ProductId == product.Id);
                    if (sale.Any())
                    {
                        //Видалити якщо час знижки закінчився
                        if (sale.First().EndDate.Date <= DateTime.UtcNow.Date)
                        {
                            await _unitOfWork.Sales.DeleteAsync(sale.First().Id);
                            await _unitOfWork.SaveAsync();
                            productListModel.DiscountPercent = 0;
                        }
                        else
                            productListModel.DiscountPercent = sale.First().DiscountPercent;
                    }
                    else
                        productListModel.DiscountPercent = 0;
                    #endregion

                    #region Перевірка наявності
                    var isInStock = product.ProductColors.Any(p => p.Quantity > 0);
                    productListModel.IsInStock = isInStock;
                    #endregion

                    #region Отримання першрої фотографії товару
                    productListModel.ColorId = product.ProductColors.FirstOrDefault().ColorId;
                    #endregion

                    products.Add(productListModel);
                }
            }

            return products;
        }

        /// <summary>
        /// Додати новий товар
        /// </summary>
        /// <param name="product"></param>
        /// <returns></returns>
        /// <exception cref="ArgumentNullException"></exception>
        public async Task<int> AddProduct(ProductCreatePayload product)
        {
            if (product.Sale is not null)
            {
                product.Sale.StartDate = product.Sale.StartDate.AddDays(1);
                product.Sale.EndDate = product.Sale.EndDate.AddDays(1);
            }

            if (product is null)
                throw new ArgumentNullException(nameof(product));

            //Тип-посередник
            ProductCreateDTO productDTO = _mapper.Map<ProductCreateDTO>(product);

            #region Валідація
            ProductValidation validation = new ProductValidation(_unitOfWork);

            //Валідація всього продукту
            //Якщо тут не викинеться виключення, значить все добре
            try
            {
                await validation.Validate(productDTO);
                //Код має бути унікальним
                if (_unitOfWork.Products.FindAsync(p => p.Code == productDTO.Code).Result.Any())
                    throw new BusinessException(nameof(productDTO.Code) + " code must be unique");
                await validation.CategoryValid(productDTO.CategoryId);
                validation.SaleValid(productDTO.Sale);
                validation.PictureValid(productDTO.Pictures);
                await validation.ProductColorsValid(productDTO.ProductColors);
            }
            catch (ArgumentNullException ex)
            {
                throw ex;
            }
            catch (BusinessException ex)
            {
                throw ex;
            }
            #endregion

            Product newProduct = _mapper.Map<Product>(productDTO);

            #region Робота з фотографіями

            List<ProductPictureDTO> productPictureDTOs = productDTO.Pictures;
            List<int> picturesIds = new List<int>();

            foreach (ProductPictureDTO picture in productPictureDTOs)
            {
                Picture newPicture = new Picture()
                {
                    Address = picture.Address,
                    DeleteAddress = picture.DeleteURL
                };

                _unitOfWork.Pictures.Create(newPicture);
                await _unitOfWork.SaveAsync();

                picturesIds.Add(newPicture.Id);
            }

            ICollection<ProductPicture> productPictures = new List<ProductPicture>();

            for (int i = 0; i < picturesIds.Count; i++)
            {
                ProductPicture picture = new ProductPicture()
                {
                    ProductId = newProduct.Id,
                    PictureId = picturesIds[i],
                    IsTitle = productPictureDTOs[i].IsTitle
                };

                productPictures.Add(picture);
            }

            newProduct.ProductPictures = productPictures;

            #endregion

            #region Робота з характеристиками продукту    
            List<ProductDescriptionDTO> descriptionsDTO = productDTO.Descriptions;

            //Список всіх ідентифікаторів характеристик, які відносяться до даного продукта
            List<int> descriptionsIds = new List<int>();

            //Перебираю всі характеристики
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
                    Description newDescription = new Description
                    {
                        Name = description.Name,
                        CategoryId = productDTO.CategoryId
                    };

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
                ProductDescription description = new ProductDescription()
                {
                    DescriptionId = descriptionsIds[i],
                    ProductId = newProduct.Id,
                    About = descriptionsDTO[i].About
                };

                productDescriptions.Add(description);
            }

            newProduct.ProductDescriptions = productDescriptions;
            #endregion

            //Добавлення нового продукту в БД
            _unitOfWork.Products.Create(newProduct);
            await _unitOfWork.SaveAsync();

            #region Робота зі знижкою

            if (productDTO.Sale != null)
            {
                Sale sale = new Sale
                {
                    StartDate = productDTO.Sale.StartDate,
                    EndDate = productDTO.Sale.EndDate,
                    DiscountPercent = productDTO.Sale.DiscountPercent,
                    ProductId = newProduct.Id
                };

                _unitOfWork.Sales.Create(sale);
                await _unitOfWork.SaveAsync();
            }
            #endregion

            return newProduct.Id;
        }

        /// <summary>
        /// Видалити товар
        /// </summary>
        /// <param name="productId"></param>
        /// <returns></returns>
        /// <exception cref="ArgumentNullException"></exception>
        /// <exception cref="NotFoundException"></exception>
        public async Task<int> DeleteProduct(int productId)
        {
            if (productId <= 0)
                throw new ArgumentNullException("Некоректний ID!");

            var product = await _unitOfWork.Products.GetAsync(productId);

            if (product is null)
                throw new NotFoundException($"Немає продукту з ID={productId}");

            //Спочатку йде видалення записів з таблички ProductDescriptions
            foreach (var productDescription in product.ProductDescriptions)
            {
                Composite2Key key = new Composite2Key
                {
                    Column1 = productDescription.DescriptionId,
                    Column2 = productDescription.ProductId
                };
                await _unitOfWork.ProductDescriptions.DeleteAsync(key);

                //Видалення опису, якщо його він не використовуєтсья жодним товаром
                if (_unitOfWork.ProductDescriptions.FindAsync(pd => pd.DescriptionId
                           == productDescription.DescriptionId).Result.FirstOrDefault() == null)
                {
                    await _unitOfWork.Descriptions.DeleteAsync(productDescription.DescriptionId);
                }
            }

            //Вигружаю всі старі фотографії які відносяться до товару
            var oldProductPictures = await _unitOfWork.ProductPictures.FindAsync(pp => pp.ProductId == product.Id);
            //Всі фотографії, які більше не відносяться до даного товару, видаляютсья
            foreach (int pictureId in oldProductPictures.Select(p => p.PictureId))
            {
                await _unitOfWork.Pictures.DeleteAsync(pictureId);

                await _unitOfWork.ProductPictures.DeleteAsync(new Composite2Key
                {
                    Column1 = productId,
                    Column2 = pictureId
                });
            }

            await _unitOfWork.Products.DeleteAsync(productId);
            await _unitOfWork.SaveAsync();

            await DeleteUnusedDescriptions(product.CategoryId);

            return product.Id;
        }

        /// <summary>
        /// Отримати товар за id
        /// </summary>
        /// <param name="productId"></param>
        /// <returns></returns>
        /// <exception cref="ArgumentNullException"></exception>
        /// <exception cref="NotFoundException"></exception>
        public async Task<ProductDetails> GetProduct(int productId)
        {
            if (productId <= 0)
                throw new ArgumentNullException(nameof(productId) + " is invalid");

            var product = await _unitOfWork.Products.GetAsync(productId);

            if (product is null)
            {
                throw new NotFoundException(nameof(product) + " No product with this ID!");
            }

            ProductDetails details = _mapper.Map<ProductDetails>(product);

            #region Descriptions
            //Підтягуються характеристики товару
            for (int i = 0; i < details.Descriptions.Count; i++)
            {
                var desc = await _unitOfWork.Descriptions.GetAsync(
                    product.ProductDescriptions.ElementAt(i).DescriptionId);
                details.Descriptions[i].Name = desc.Name;
                details.Descriptions[i].Id = desc.Id;
            }
            #endregion
            #region Pictures
            //Підтягуютсья фотографії товару
            for (int i = 0; i < details.Pictures.Count; i++)
            {
                var pict = await _unitOfWork.Pictures.GetAsync(
                    product.ProductPictures.ElementAt(i).PictureId);
                details.Pictures[i].Address = pict.Address;
                details.Pictures[i].Id = pict.Id;
                details.Pictures[i].DeleteURL = pict.DeleteAddress;
            }
            #endregion
            #region Sale
            //Підтягується знижка
            Sale sale = (await _unitOfWork.Sales
                .FindAsync(s => s.ProductId == productId) as List<Sale>).FirstOrDefault();

            if (sale != null)
            {
                //Видалити якщо час знижки закінчився
                if (sale.EndDate.Date < DateTime.UtcNow.Date)
                {
                    await _unitOfWork.Sales.DeleteAsync(sale.Id);
                    await _unitOfWork.SaveAsync();
                }
                else
                    details.Sale = new SaleDetails
                    {
                        StartDate = sale.StartDate,
                        EndDate = sale.EndDate,
                        DiscountPercent = sale.DiscountPercent,
                        Id = sale.Id
                    };
            }

            #endregion
            #region Colors

            for (int i = 0; i < details.ProductColors.Count(); i++)
            {
                var color = _unitOfWork
                    .Colors.FindAsync(c => c.Id == details.ProductColors[i].ColorId).Result.FirstOrDefault();

                details.ProductColors[i].Color = _mapper.Map<ColorDTO>(color);
            }

            #endregion

            return details;
        }

        /// <summary>
        /// Редагування товару
        /// </summary>
        /// <param name="productPayload"></param>
        /// <returns></returns>
        /// <exception cref="ArgumentNullException"></exception>
        /// <exception cref="NotFoundException"></exception>
        /// <exception cref="BusinessException"></exception>
        public async Task<int> UpdateProduct(ProductUpdatePayload productPayload)
        {
            if (productPayload is null) throw new ArgumentNullException("Некоректні дані");

            if (productPayload.Sale is not null)
            {
                productPayload.Sale.StartDate = productPayload.Sale.StartDate.AddDays(1);
                productPayload.Sale.EndDate = productPayload.Sale.EndDate.AddDays(1);
            }

            ProductUpdateDTO updatedProduct = _mapper.Map<ProductUpdateDTO>(productPayload);

            if (updatedProduct is null)
                throw new NotFoundException("Некоректні дані");

            Product productToUpdate = _unitOfWork.Products.FindAsync(p => p.Id == updatedProduct.Id).Result.FirstOrDefault();

            #region Validation
            //Якщо такого продукту взагалі не існує
            if (productToUpdate is null) throw new NotFoundException("Неіснуючий товар");

            ProductValidation validation = new ProductValidation(_unitOfWork);

            //Валідація всього продукту
            //Якщо тут не викинеться виключення, значить все добре
            try
            {
                validation.CodeValid(updatedProduct.Code);

                var productByCodeCount = _unitOfWork.Products.FindAsync(x => x.Code == updatedProduct.Code).Result.Count();

                if (productByCodeCount > 1)
                    throw new BusinessException("Товар з таким кодом вже існує!");

                await validation
                     .ProductColorsValid(updatedProduct.ColorDetails);

                var countryId = await validation.ManufacturerCountryValidAsync(updatedProduct.ManufacturerCountryId);
                productToUpdate.ManufacturerCountryId = countryId;

                var manufacturerId = await validation.ManufacturerValidAsync(updatedProduct.ManufacturerId);
                productToUpdate.ManufacturerId = manufacturerId;

                //validation.SaleValid(updatedProduct.Sale);
            }
            catch (ArgumentNullException ex)
            {
                throw ex;
            }
            catch (BusinessException ex)
            {
                throw ex;
            }

            #endregion

            productToUpdate.Code = updatedProduct.Code;
            productToUpdate.Name = updatedProduct.Name;
            productToUpdate.Description = updatedProduct.Description;
            productToUpdate.IsInBestProducts = updatedProduct.IsInBestProducts;

            #region ProductColor
            List<ProductColor> colorList = new List<ProductColor>();

            foreach (var productColor in updatedProduct.ColorDetails)
            {
                colorList.Add(new ProductColor
                {
                    ProductId = updatedProduct.Id,
                    Price = productColor.Price,
                    Quantity = productColor.Quantity,
                    ColorId = productColor.ColorId
                });
            }
            productToUpdate.ProductColors = colorList;
            #endregion

            #region Picures validation

            if (updatedProduct.Pictures.Count == 0)
                throw new ArgumentNullException("Немає фотографій!");
            if (updatedProduct.Pictures.Where(p => p.IsTitle == true).Count() == 0)
                throw new BusinessException("Немає головної фотографії!");
            if (updatedProduct.Pictures.Where(p => p.IsTitle == true).Count() >= 2)
                throw new BusinessException("Головна фотографія має бути лише одна!");

            #endregion

            #region Photos
            //Якщо у відредагованого товару немає фотографій
            if (updatedProduct.Pictures.Count == 0)
                throw new BusinessException("Немає фотографій!");

            //Всі фотографії які відносяться до зміненого товару
            List<Picture> updatedPictures = new List<Picture>();
            foreach (ProductPictureDetails picture in updatedProduct.Pictures)
            {
                //Ті фото які віддносяться суто до цього товару
                Picture updatePicture = _unitOfWork.Pictures.FindAsync(p => p.Id == picture.Id)
                    .Result.FirstOrDefault();

                if (updatePicture != null)
                {
                    if (updatePicture.Address != picture.Address)
                    {
                        updatePicture.Address = picture.Address;
                        updatePicture.DeleteAddress = picture.DeleteURL;

                        _unitOfWork.Pictures.Update(updatePicture);
                    }
                }
                else
                {
                    updatePicture = new Picture
                    {
                        Address = picture.Address,
                        DeleteAddress = picture.DeleteURL
                    };
                    _unitOfWork.Pictures.Create(updatePicture);
                }
                updatedPictures.Add(updatePicture);
            }
            #endregion

            #region Descriptions
            List<Description> updatedDescriptions = new List<Description>();
            if (updatedProduct.Descriptions != null && updatedProduct.Descriptions.Count > 0)
            {
                foreach (ProductDescriptionDetails description in updatedProduct.Descriptions)
                {
                    Description updateDescription = _unitOfWork.Descriptions
                        .FindAsync(d => d.CategoryId == productToUpdate.CategoryId &&
                        d.Name.Trim().ToLower() == description.Name.Trim().ToLower())
                        .Result.FirstOrDefault();

                    if (updateDescription is null)
                    {
                        updateDescription = new Description
                        {
                            CategoryId = productToUpdate.CategoryId,
                            Name = description.Name
                        };
                        _unitOfWork.Descriptions.Create(updateDescription);
                    }

                    updatedDescriptions.Add(updateDescription);
                }
            }
            else //Повидаляти всі описи 
            {
                var productDescriptionsToDelete = await _unitOfWork.ProductDescriptions.FindAsync(pd => pd.ProductId == productToUpdate.Id);
                foreach (var productDescription in productDescriptionsToDelete)
                {
                    await _unitOfWork.ProductDescriptions.DeleteAsync(new Composite2Key
                    {
                        Column1 = productDescription.DescriptionId,
                        Column2 = productDescription.ProductId
                    });
                }
            }

            #endregion

            _unitOfWork.Products.Update(productToUpdate);

            #region Sale
            Sale sale = _unitOfWork.Sales.FindAsync(s => s.ProductId == productToUpdate.Id).Result.FirstOrDefault();

            //Якщо у відредагованому товарі присутня знижка
            if (updatedProduct.Sale != null)
            {
                if (sale is null && updatedProduct.Sale.DiscountPercent > 0) //Якщо знижки на цей товар ще не було, то створити
                {
                    validation.SaleValid(updatedProduct.Sale);

                    sale = new Sale
                    {
                        ProductId = productToUpdate.Id,
                        StartDate = updatedProduct.Sale.StartDate,
                        EndDate = updatedProduct.Sale.EndDate,
                        DiscountPercent = updatedProduct.Sale.DiscountPercent
                    };
                    _unitOfWork.Sales.Create(sale);
                }
                else if (updatedProduct.Sale.DiscountPercent > 0) //Якщо знижка вже існувала раніше, то просто оновити запис
                {
                    if (DateTime.Compare(updatedProduct.Sale.StartDate.Date, sale.StartDate.Date) < 0
                   || DateTime.Compare(updatedProduct.Sale.EndDate.Date, DateTime.UtcNow.Date) < 0)
                        throw new BusinessException("Дата початку та кінця акції не може бути раніша за сьогоднішню!");
                    if (DateTime.Compare(updatedProduct.Sale.StartDate.Date, updatedProduct.Sale.EndDate.Date) >= 0)
                        throw new BusinessException("Дата закінчення акції не може бути меншою ніж дата початку!");
                    if (updatedProduct.Sale.DiscountPercent > 100 || updatedProduct.Sale.DiscountPercent < 0)
                        throw new BusinessException("Некоректний відсоток знижки!");
                    sale.StartDate = updatedProduct.Sale.StartDate;
                    sale.EndDate = updatedProduct.Sale.EndDate;
                    sale.DiscountPercent = updatedProduct.Sale.DiscountPercent;
                    _unitOfWork.Sales.Update(sale);
                }
            }
            else //Якщо відредагований продукт не має знижки, а до редагування мав її, то тепер ту знижку треба видалити
            {
                if (sale != null)
                    await _unitOfWork.Sales.DeleteAsync(sale.Id);
            }
            #endregion

            await _unitOfWork.SaveAsync();

            #region ProductPictures
            //Вигружаю всі старі фотографії які відносяться до товару
            var oldProductPictures = await _unitOfWork.ProductPictures.FindAsync(pp => pp.ProductId == productToUpdate.Id);
            //Всі фотографії, які більше не відносяться до даного товару, видаляютсья
            foreach (var picture in oldProductPictures)
            {
                if (!updatedPictures.Select(p => p.Id)
                    .Contains(picture.PictureId))
                {
                    await _unitOfWork.ProductPictures.DeleteAsync(new Composite2Key
                    {
                        Column1 = picture.ProductId,
                        Column2 = picture.PictureId
                    });
                    await _unitOfWork.Pictures.DeleteAsync(picture.PictureId);
                }
            }

            //Додавання нових фотографій, або редагування старих, які не були видалені
            for (int i = 0; i < updatedPictures.Count; i++)
            {
                ProductPicture productPicture = new ProductPicture
                {
                    PictureId = updatedPictures[i].Id,
                    ProductId = productToUpdate.Id,
                    IsTitle = updatedProduct.Pictures[i].IsTitle
                };

                var productPictureToUpdate = await _unitOfWork.ProductPictures.GetAsync(new Composite2Key
                {
                    Column1 = productPicture.ProductId,
                    Column2 = productPicture.PictureId
                });

                if (productPictureToUpdate is null)
                    _unitOfWork.ProductPictures.Create(productPicture);
                else
                    _unitOfWork.ProductPictures.Update(productPicture);
            }
            #endregion

            #region ProductDescriptions

            if (updatedDescriptions.Count > 0)
            {
                //Всі старі описи які відносяться до товару
                var oldProductDescriptions = await _unitOfWork.ProductDescriptions.FindAsync(
                    pd => pd.ProductId == productToUpdate.Id
                    );

                foreach (var productDescription in oldProductDescriptions)
                {
                    if (!updatedDescriptions.Select(ud => ud.Id)
                        .Contains(productDescription.DescriptionId))
                    {
                        await _unitOfWork.ProductDescriptions.DeleteAsync(new Composite2Key
                        {
                            Column1 = productDescription.DescriptionId,
                            Column2 = productDescription.ProductId
                        }); ;

                        //Видалення опису, якщо його він не використовуєтсья жодним товаром
                        if (_unitOfWork.ProductDescriptions.FindAsync(pd => pd.DescriptionId
                            == productDescription.DescriptionId).Result.Count() == 0)
                        {
                            await _unitOfWork.Descriptions.DeleteAsync(productDescription.DescriptionId);
                        }
                    }
                }

                for (int i = 0; i < updatedDescriptions.Count; i++)
                {
                    ProductDescription productDescription = new ProductDescription
                    {
                        DescriptionId = updatedDescriptions[i].Id,
                        About = updatedProduct.Descriptions[i].About,
                        ProductId = productToUpdate.Id
                    };

                    var productDescriptionToUpdate = await _unitOfWork.ProductDescriptions.GetAsync(
                        new Composite2Key
                        {
                            Column1 = productDescription.DescriptionId,
                            Column2 = productDescription.ProductId
                        });
                    if (productDescriptionToUpdate is null)
                        _unitOfWork.ProductDescriptions.Create(productDescription);
                    else
                        _unitOfWork.ProductDescriptions.Update(productDescription);
                }
            }

            #endregion

            #region ProductColors
            //Ключі до потрібних кольорів
            List<int> colorIds = productToUpdate.ProductColors.Select(c => c.ColorId).ToList();

            List<ProductColor> productColorsForDelete = _unitOfWork.ProductColors
                .FindAsync(pc => pc.ProductId == productToUpdate.Id
                && !colorIds.Contains(pc.ColorId)).Result.ToList();

            foreach (ProductColor colorDelete in productColorsForDelete)
            {
                await _unitOfWork.ProductColors.DeleteAsync(new Composite2Key
                {
                    Column1 = colorDelete.ProductId,
                    Column2 = colorDelete.ColorId
                });
            }
            await _unitOfWork.SaveAsync();
            foreach (ProductColor productColor in productToUpdate.ProductColors)
            {
                if (await _unitOfWork.ProductColors
                    .GetAsync(new Composite2Key
                    {
                        Column1 = updatedProduct.Id,
                        Column2 = productColor.ColorId
                    }) is null)
                    _unitOfWork.ProductColors.Create(productColor);
                else
                    _unitOfWork.ProductColors.Update(productColor);
            }

            #endregion
            await _unitOfWork.SaveAsync();

            await DeleteUnusedDescriptions(productToUpdate.CategoryId);

            return productToUpdate.Id;
        }

        public async Task<int> GetProductCount()
        {
            return await _unitOfWork.Products.GetAllCount();
        }

        public async Task<List<ProductToReturnAllDTO>> GetAllProducts(int? categoryId = null)
        {
            List<Product> products = new List<Product>();
            if (categoryId != null)
            {
                products = _unitOfWork.Products.FindAsync(product => product.CategoryId == categoryId).Result.ToList();
            }
            else
            {
                products = _unitOfWork.Products.GetAllAsync().Result.ToList();
            }


            List<ProductToReturnAllDTO> res = new List<ProductToReturnAllDTO>();

            foreach (var product in products)
            {
                var pictureId = product.ProductPictures.Where(p => p.ProductId == product.Id && p.IsTitle == true)
                    .FirstOrDefault().PictureId;
                var discountPercent = _unitOfWork.Sales.FindAsync(s => s.ProductId == product.Id).Result.FirstOrDefault();

                var picture = await _unitOfWork.Pictures.FindAsync(p => p.Id == pictureId);

                ProductToReturnAllDTO tmp = new ProductToReturnAllDTO
                {
                    Id = product.Id,
                    Code = product.Code,
                    Name = product.Name,
                    DiscountPercent = discountPercent is null ? 0 : discountPercent.DiscountPercent,
                    Picture = picture.FirstOrDefault().Address
                };
                foreach (var colorPrice in product.ProductColors)
                {
                    var color = _unitOfWork
                    .Colors.FindAsync(c => c.Id == colorPrice.ColorId).Result.FirstOrDefault();

                    ProductToReturnAllDTO productToReturnAll = new ProductToReturnAllDTO
                    {
                        Id = tmp.Id,
                        Code = tmp.Code,
                        Name = tmp.Name,
                        DiscountPercent = tmp.DiscountPercent,
                        Color = color.Name,
                        Price = colorPrice.Price,
                        Quantity = colorPrice.Quantity,
                        Picture = tmp.Picture,
                    };

                    res.Add(productToReturnAll);
                }
            }

            return res;
        }

        public async Task<ProductReviewAnalitic> GetProductReviewsAnalitic(int id)
        {
            if (id <= 0)
                throw new BusinessException("Не коректне id товару!");

            var productReviews = _unitOfWork.Reviews.FindAsync(r => r.ProductId == id).Result.ToList();

            if (productReviews.Count() == 0)
            {
                return new ProductReviewAnalitic
                {
                    AverageValue = 0,
                    ReviewsCount = 0,
                    StartsCount = 0
                };
            }
            else
            {
                return new ProductReviewAnalitic
                {
                    StartsCount = productReviews.Sum(r => r.NumberOfStars) / productReviews.Count(),
                    ReviewsCount = productReviews.Count(),
                    AverageValue = (float)productReviews.Sum(r => r.NumberOfStars) / productReviews.Count()
                };
            }
        }

        public async Task<List<ProductFromCartDTO>> GetProductsFromCart(List<PayloadProductIdColorId> ids)
        {
            List<ProductFromCartDTO> result = new List<ProductFromCartDTO>();
            if (ids is null)
            {
                return result;
            }
            List<ProductIdColorId> ts = _mapper.Map<List<ProductIdColorId>>(ids);

            foreach (var item in ts)
            {
                ProductFromCartDTO product = new ProductFromCartDTO();
                var p = await _unitOfWork.Products.GetAsync(item.ProductId);

                product.Id = p.Id;
                product.Name = p.Name;

                var color = p.ProductColors.Where(p => p.ProductId == item.ProductId && p.ColorId == item.ColorId).FirstOrDefault();
                product.ColorId = item.ColorId;
                product.Price = color.Price;
                product.Quantity = color.Quantity;

                var colorName = await _unitOfWork.Colors.GetAsync(color.ColorId);
                product.ColorName = colorName.Name;

                int i = p.ProductPictures.Where(c => c.IsTitle == true).FirstOrDefault().PictureId;
                product.Picture = _unitOfWork.Pictures.GetAsync(i).Result.Address;

                var sale = _unitOfWork.Sales.FindAsync(s => s.ProductId == item.ProductId).Result.FirstOrDefault();
                if (sale is not null)
                {
                    product.Discount = sale.DiscountPercent;
                }
                else
                {
                    product.Discount = 0;
                }

                result.Add(product);
            }

            return result;
        }

        public async Task<List<ProductListModel>> InterestingForYou(int categoryId)
        {
            List<ProductListModel> products = new List<ProductListModel>();

            //Отримання користувача
            var user = _httpContextAccessor.HttpContext.User.Claims.FirstOrDefault(c => c.Type == "UserId");

            IEnumerable<Product> productsByCategory = new List<Product>();

            productsByCategory = await _unitOfWork.Products.FindAsync(p => p.CategoryId == categoryId);

            //Якщо якісь продукти попали під фільтри (збирання всієї необхідної інформації про продукти)
            if (productsByCategory.Count() > 0)
            {
                int count = 0;
                foreach (var product in productsByCategory)
                {
                    ProductListModel productListModel = new ProductListModel
                    {
                        Id = product.Id,
                        Name = product.Name,
                    };

                    productListModel.Price = product.ProductColors.First().Price;

                    #region Головна фотографія
                    var pictures = await _unitOfWork.Pictures.FindAsync(pp => pp.Id == product.ProductPictures
                    .Where(p => p.IsTitle == true && p.ProductId == product.Id)
                        .Select(p => p.PictureId).FirstOrDefault());

                    productListModel.Picture = pictures.Select(pp => pp.Address).FirstOrDefault();
                    #endregion

                    #region Чи є цей товар в улуюблених товарах користувача
                    if (user is not null)
                    {
                        var likedProducts = await _unitOfWork.LikedProducts.FindAsync(l => l.UserId == Int32.Parse(user.Value) &&
                        l.ProductId == product.Id);

                        productListModel.IsInLiked = likedProducts.Any();
                    }
                    else
                    {
                        productListModel.IsInLiked = false;
                    }

                    #endregion

                    #region Чи є цей товар в корзині користувача
                    if (user is not null)
                    {
                        var productsInCart = await _unitOfWork.ShoppingCarts.FindAsync(c => c.UserId == Int32.Parse(user.Value) &&
                        c.ProductId == product.Id);
                        productListModel.IsInCart = productsInCart.Any();
                    }
                    else
                    {
                        productListModel.IsInCart = false;
                    }
                    #endregion

                    #region Перевірка знижки
                    var sale = await _unitOfWork.Sales.FindAsync(s => s.ProductId == product.Id);
                    if (sale.Any())
                    {
                        //Видалити якщо час знижки закінчився
                        if (sale.First().EndDate.Date <= DateTime.UtcNow.Date)
                        {
                            await _unitOfWork.Sales.DeleteAsync(sale.First().Id);
                            await _unitOfWork.SaveAsync();
                            productListModel.DiscountPercent = 0;
                        }
                        else
                            productListModel.DiscountPercent = sale.First().DiscountPercent;
                    }
                    else
                        productListModel.DiscountPercent = 0;
                    #endregion

                    #region Перевірка наявності
                    var isInStock = product.ProductColors.Any(p => p.Quantity > 0);
                    productListModel.IsInStock = isInStock;
                    #endregion

                    #region Отримання першрої фотографії товару
                    productListModel.ColorId = product.ProductColors.FirstOrDefault().ColorId;
                    #endregion
                    if (++count < 16)
                        products.Add(productListModel);
                    else
                        return products;
                }
            }

            return products;
        }

        public async Task<List<ProductListModel>> LikedProducts(List<int> productIds)
        {
            List<ProductListModel> products = new List<ProductListModel>();

            if(productIds is not null)
            {
                //Отримання користувача
                var user = _httpContextAccessor.HttpContext.User.Claims.FirstOrDefault(c => c.Type == "UserId");

                IEnumerable<Product> productsByCategory = new List<Product>();

                productsByCategory = await _unitOfWork.Products.FindAsync(p => productIds.Contains(p.Id));

                //Якщо якісь продукти попали під фільтри (збирання всієї необхідної інформації про продукти)
                if (productsByCategory.Count() > 0)
                {
                    foreach (var product in productsByCategory)
                    {
                        ProductListModel productListModel = new ProductListModel
                        {
                            Id = product.Id,
                            Name = product.Name,
                        };

                        productListModel.Price = product.ProductColors.First().Price;

                        #region Головна фотографія
                        var pictures = await _unitOfWork.Pictures.FindAsync(pp => pp.Id == product.ProductPictures
                        .Where(p => p.IsTitle == true && p.ProductId == product.Id)
                            .Select(p => p.PictureId).FirstOrDefault());

                        productListModel.Picture = pictures.Select(pp => pp.Address).FirstOrDefault();
                        #endregion

                        #region Чи є цей товар в улуюблених товарах користувача
                        if (user is not null)
                        {
                            var likedProducts = await _unitOfWork.LikedProducts.FindAsync(l => l.UserId == Int32.Parse(user.Value) &&
                            l.ProductId == product.Id);

                            productListModel.IsInLiked = likedProducts.Any();
                        }
                        else
                        {
                            productListModel.IsInLiked = false;
                        }

                        #endregion

                        #region Чи є цей товар в корзині користувача
                        if (user is not null)
                        {
                            var productsInCart = await _unitOfWork.ShoppingCarts.FindAsync(c => c.UserId == Int32.Parse(user.Value) &&
                            c.ProductId == product.Id);
                            productListModel.IsInCart = productsInCart.Any();
                        }
                        else
                        {
                            productListModel.IsInCart = false;
                        }
                        #endregion

                        #region Перевірка знижки
                        var sale = await _unitOfWork.Sales.FindAsync(s => s.ProductId == product.Id);
                        if (sale.Any())
                        {
                            //Видалити якщо час знижки закінчився
                            if (sale.First().EndDate.Date <= DateTime.UtcNow.Date)
                            {
                                await _unitOfWork.Sales.DeleteAsync(sale.First().Id);
                                await _unitOfWork.SaveAsync();
                                productListModel.DiscountPercent = 0;
                            }
                            else
                                productListModel.DiscountPercent = sale.First().DiscountPercent;
                        }
                        else
                            productListModel.DiscountPercent = 0;
                        #endregion

                        #region Перевірка наявності
                        var isInStock = product.ProductColors.Any(p => p.Quantity > 0);
                        productListModel.IsInStock = isInStock;
                        #endregion

                        #region Отримання першрої фотографії товару
                        productListModel.ColorId = product.ProductColors.FirstOrDefault().ColorId;
                        #endregion

                        
                        products.Add(productListModel);
                    }
                }
            }
            
            return products;
        }

        private async Task DeleteUnusedDescriptions(int categoryId)
        {
            //Всі характеристики з переданої категорії
            var descroptions = await _unitOfWork.Descriptions.FindAsync(d => d.CategoryId == categoryId);

            var isUsed = 0;
            foreach (var description in descroptions)
            {
                isUsed = _unitOfWork.ProductDescriptions
                    .FindAsync(pd => pd.DescriptionId == description.Id).Result.Count();

                if (isUsed == 0)
                {
                    await _unitOfWork.Descriptions.DeleteAsync(description.Id);
                }
            }
            await _unitOfWork.SaveAsync();
        }
    }
}