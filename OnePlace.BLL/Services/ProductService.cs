﻿using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
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
            var user = await _userManager.GetUserAsync(_httpContextAccessor.HttpContext.User);

            //Перебір всіх продуктів
            foreach (var product in products.Items)
            {
                //Створення моделі, яка представляє собою товар (головні характеристики)
                ProductListModel productListModel = new ProductListModel
                {
                    Id = product.Id,
                    Name = product.Name
                };

                productListModel.Price = product.ProductColors.First().Price;

                //Головна фотографія
                var pictures = await _unitOfWork.Pictures.FindAsync(pp => pp.Id == product.ProductPictures
                .Where(p => p.IsTitle == true && p.ProductId == product.Id)
                    .Select(p => p.PictureId).FirstOrDefault());

                productListModel.Picture = pictures.Select(pp => pp.Address).FirstOrDefault();

               

                //Чи є цей товар в улуюблених товарах користувача
                var likedProducts = await _unitOfWork.LikedProducts.FindAsync(l => l.UserId == user.Id &&
                l.ProductId == product.Id);

                productListModel.IsInLiked = likedProducts.Any();

                //Чи є цей товар в корзині користувача
                var productsInCart = await _unitOfWork.ShoppingCarts.FindAsync(c => c.UserId == user.Id &&
                c.ProductId == product.Id);

                productListModel.IsInCart = productsInCart.Any();

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

                productListModels.Add(productListModel);
            }

            //Створення пагінованого списку з продуктів
            var result = new PaginatedList<ProductListModel>
            {
                Items = productListModels,
                Total = productListModels.Count
            };

            return result;
        }

        /// <summary>
        /// Додати новий товар
        /// </summary>
        /// <param name="product"></param>
        /// <returns></returns>
        /// <exception cref="ArgumentNullException"></exception>
        public async Task<int> AddProduct(ProductCreatePayload product)
        {

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
                    Address = picture.Address
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
                throw new ArgumentNullException(nameof(productId) + " некоректний ID");

            var product = await _unitOfWork.Products.GetAsync(productId);

            if (product is null)
                throw new NotFoundException(nameof(product) + " немає такого продукту");

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
            if (productPayload is null) throw new ArgumentNullException(nameof(productPayload) + " is null");

            ProductUpdateDTO updatedProduct = _mapper.Map<ProductUpdateDTO>(productPayload);

            if (updatedProduct is null)
                throw new NotFoundException(nameof(ProductUpdateDTO) + " null");

            Product productToUpdate = _unitOfWork.Products.FindAsync(p => p.Id == updatedProduct.Id).Result.FirstOrDefault();

            #region Validation
            //Якщо такого продукту взагалі не існує
            if (productToUpdate is null) throw new NotFoundException(nameof(ProductUpdateDTO) + " not exists!");

            ProductValidation validation = new ProductValidation(_unitOfWork);

            //Валідація всього продукту
            //Якщо тут не викинеться виключення, значить все добре
            try
            {
                validation.CodeValid(updatedProduct.Code);
                
               await validation
                    .ProductColorsValid(updatedProduct.ColorDetails);

                var countryId = await validation.ManufacturerCountryValidAsync(updatedProduct.ManufacturerCountryId);
                productToUpdate.ManufacturerCountryId = countryId;

                var manufacturerId = await validation.ManufacturerValidAsync(updatedProduct.ManufacturerId);
                productToUpdate.ManufacturerId = manufacturerId;

                validation.SaleValid(updatedProduct.Sale);
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
                    Quantity= productColor.Quantity,
                    ColorId = productColor.ColorId
                });
            }
            productToUpdate.ProductColors = colorList;
            #endregion

            #region Picures validation

            if (updatedProduct.Pictures.Count == 0)
                throw new ArgumentNullException(nameof(Picture) + " no pictures");
            if (updatedProduct.Pictures.Where(p => p.IsTitle == true).Count() == 0)
                throw new BusinessException("no title picture");
            if (updatedProduct.Pictures.Where(p => p.IsTitle == true).Count() >= 2)
                throw new BusinessException("more than one title pictures");

            #endregion

            #region Photos
            //Якщо у відредагованого товару немає фотографій
            if (updatedProduct.Pictures.Count == 0)
                throw new BusinessException(nameof(updatedProduct.Pictures) + " add photos");

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
                        _unitOfWork.Pictures.Update(updatePicture);
                    }
                }
                else
                {
                    updatePicture = new Picture
                    {
                        Address = picture.Address
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
                if (sale is null) //Якщо знижки на цей товар ще не було, то створити
                {
                    sale = new Sale
                    {
                        ProductId = productToUpdate.Id,
                        StartDate = updatedProduct.Sale.StartDate,
                        EndDate = updatedProduct.Sale.EndDate,
                        DiscountPercent = updatedProduct.Sale.DiscountPercent
                    };
                    _unitOfWork.Sales.Create(sale);
                }
                else //Якщо знижка вже існувала раніше, то просто оновити запис
                {
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
                if(await _unitOfWork.ProductColors
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

        private async Task DeleteUnusedDescriptions(int categoryId)
        {
            //Всі характеристики з переданої категорії
            var descroptions = await _unitOfWork.Descriptions.FindAsync(d=>d.CategoryId == categoryId);

            var isUsed = 0;
            foreach (var description in descroptions)
            {
                isUsed = _unitOfWork.ProductDescriptions
                    .FindAsync(pd => pd.DescriptionId == description.Id).Result.Count();
            
                if(isUsed == 0)
                {
                    await _unitOfWork.Descriptions.DeleteAsync(description.Id);
                }
            }
            await _unitOfWork.SaveAsync();
        }
    }   
}