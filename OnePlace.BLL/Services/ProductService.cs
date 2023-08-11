using AutoMapper;
using Microsoft.Extensions.Logging;
using OnePlace.BLL.Interfaces;
using OnePlace.BLL.Utilities;
using OnePlace.BLL.Validators;
using OnePlace.BOL.DescriptionDTO;
using OnePlace.BOL.Exceptions;
using OnePlace.BOL.Picture;
using OnePlace.BOL.ProductDTO;
using OnePlace.BOL.ProductPayload;
using OnePlace.BOL.Sale;
using OnePlace.BOL.Warehouse;
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


        //Dependency injection of repository

        public ProductService(IMapper mapper, 
            ILogger<ProductService> logger,
            IUnitOfWork unitOfWork)
        {
            _mapper = mapper;
            _logger = logger;
            _unitOfWork = unitOfWork;
        }

        public async Task<PaginatedList<ProductDetails>> FilterProduct(ProductSearchParams filters)
        {
            var searchParams = _mapper.Map<DAL.SearchParams.ProductSearchParams>(filters);
            var products = await _unitOfWork.Products.Filter(searchParams);
            var result = _mapper.Map<PaginatedList<ProductDetails>>(products); 
            return result;
        }

        public async Task<int> AddProduct(ProductCreatePayload product)
        {

            if (product == null)
                throw new ArgumentNullException(nameof(product));

            //Тип-посередник
            ProductCreateDTO productDTO = _mapper.Map<ProductCreateDTO>(product);

            #region Валідація всіх полів
            #region Category

            CategoryValidation categoryValidation = new CategoryValidation(_unitOfWork);
            
            if (productDTO.CategoryId <= 0)
                throw new ArgumentNullException(nameof(product) + " no categiry ID");
            
            //Перевірити чи є категорія за вказаним id
            if (!await categoryValidation.Exists(productDTO.CategoryId))
                throw new ArgumentNullException(nameof(product) + " invalid category ID");

            //Продукт не можна вставляти в ту категорію, яка має вже підкатегорії
            
            if(await categoryValidation.HasSubCategory(productDTO.CategoryId))
                throw new BusinessException(nameof(Category) + " в цю категорію не можна добавляти продукти," +
                    "тому що йя категорія містить підкатегорії");

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
            #region Sale

            if(productDTO.Sale != null)
            {
                if (DateTime.Compare(productDTO.Sale.StartDate, productDTO.Sale.EndDate) >= 0)
                    throw new BusinessException(nameof(DateTime) + " дата закінчення акції не може бути меншою ніж дата початку");
                if (productDTO.Sale.DiscountPercent > 100 || productDTO.Sale.DiscountPercent < 0)
                    throw new BusinessException("некоректний відсоток знижки");
            }
            

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
            #region Робота з локацією продукта

            IEnumerable<Warehouse> warehouse = await _unitOfWork.Warehouses.FindAsync(w => w.Location == productDTO.Warehouse.Location);
            WarehouseProduct warehouseProduct = new WarehouseProduct();
            if (warehouse.Count() == 0) // Якщо такої локації ще немає
                                        //Створення нової локації і прив'язка до неї продукта
            {
                Warehouse newWarehouse = new Warehouse();
                newWarehouse.Location = productDTO.Warehouse.Location;
                
                _unitOfWork.Warehouses.Create(newWarehouse);
                await _unitOfWork.SaveAsync();
               
                warehouseProduct.WarehouseId = newWarehouse.Id;
            }
            else
                warehouseProduct.WarehouseId = warehouse.First().Id;

            warehouseProduct.ProductId = newProduct.Id;
            warehouseProduct.Quantity = productDTO.Warehouse.Quantity;
            _unitOfWork.WarehouseProducts.Create(warehouseProduct);

            await _unitOfWork.SaveAsync();
            #endregion

            #region Робота зі знижкою

            Sale sale = new Sale();
            sale.StartDate = productDTO.Sale.StartDate;
            sale.EndDate = productDTO.Sale.EndDate;
            sale.DiscountPercent = productDTO.Sale.DiscountPercent;
            sale.ProductId = newProduct.Id;

            _unitOfWork.Sales.Create(sale);
            await _unitOfWork.SaveAsync();
            #endregion

            return newProduct.Id;
        }

        public async Task<int> DeleteProduct(int productId)
        {
            if(productId <= 0) 
                throw new ArgumentNullException(nameof(productId) + " некоректний ID");

            var product = await _unitOfWork.Products.GetAsync(productId);

            if (product == null)
                throw new NotFoundException(nameof(product) + " немає такого продукту");

            //Спочатку йде видалення записів з таблички ProductDescriptions
            foreach (var item in product.ProductDescriptions)
            {
                CompositeKey key = new CompositeKey();
                key.Column1 = item.DescriptionId;
                key.Column2 = item.ProductId;
                await _unitOfWork.ProductDescriptions.DeleteAsync(key);
            }


            await _unitOfWork.Products.DeleteAsync(productId);
            await _unitOfWork.SaveAsync();
            return product.Id;
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
            #region Warehouse
            //Підтягується локація товару, та кількість в наявності 
            IEnumerable<WarehouseProduct> warehouseProduct = await _unitOfWork.WarehouseProducts
                .FindAsync(wp=>wp.ProductId== productId);
            if(warehouseProduct.Count()>0)
            {
                Warehouse warehouse = await _unitOfWork.Warehouses.GetAsync(warehouseProduct.First().WarehouseId);

                WarehouseDetails warehouseDetails = new WarehouseDetails();
                warehouseDetails.Location = warehouse.Location;
                warehouseDetails.Quantity = warehouseProduct.First().Quantity;
                warehouseDetails.Id = warehouseProduct.First().WarehouseId;
                details.Warehouse = warehouseDetails;
            }
            #endregion
            #region Sale
            //Підтягується знижка
            Sale sale = (await _unitOfWork.Sales
                .FindAsync(s => s.ProductId == productId) as List<Sale>).FirstOrDefault();

            if (sale != null)
            {
                SaleDetails saleDetails = new SaleDetails();

                saleDetails.StartDate = sale.StartDate;
                saleDetails.EndDate = sale.EndDate;
                saleDetails.DiscountPercent = sale.DiscountPercent;
                saleDetails.Id = sale.Id;

                details.Sale = saleDetails;
            }
            #endregion

            return details;

            //_logger.LogInformation("Створюємо продукт");
            //throw new ValidationException(nameof(ProductDTO.CategoryId), "Товари з росії заборонені", "Ця категорія ще не доступна");
            //throw new NotFoundException(productId, nameof(ProductDetails));
            //throw new NotImplementedException();
        }

        public async Task<int> UpdateProduct(ProductPayload productPayload)
        {
            ProductDTO productDTO = _mapper.Map<ProductDTO>(productPayload);

            if (productDTO == null)
                throw new NotFoundException(nameof(ProductDTO) + " null");


            #region Category

            if (productDTO.CategoryId <= 0)
                throw new NotFoundException(nameof(Category) + " неіснуюча категорія");

            CategoryValidation categoryValidation = new CategoryValidation(_unitOfWork);
            
            if (!await categoryValidation.Exists(productDTO.CategoryId))
                throw new NotFoundException(nameof(Category) + " неіснуюча категорія");

            if(await categoryValidation.HasSubCategory(productDTO.CategoryId))
                throw new BusinessException(nameof(Category) + " в цю категорію не можна добавляти продукти," +
                   "тому що йя категорія містить підкатегорії");

            #endregion

            #region Validation
            #region Manufacturer country
            if (productDTO.ManufacturerCountryId <= 0)
                throw new ArgumentNullException(nameof(productDTO) + " invalid manufacturer country ID");
            var country = await _unitOfWork.ManufactureCountries.GetAsync(productDTO.ManufacturerCountryId ?? default(int));
            if (country == null)
                throw new ArgumentNullException(nameof(productDTO) + " invalid manufacturer country ID");
            #endregion
            #region Manufacturer
            if (productDTO.ManufacturerId <= 0)
                throw new ArgumentNullException(nameof(productDTO) + " invalid manufacturer ID");
            var manufacturer = await _unitOfWork.Manufacturers.GetAsync(productDTO.ManufacturerId ?? default(int));
            if (manufacturer == null)
                throw new ArgumentNullException(nameof(productDTO) + " invalid manufacturer ID");
            #endregion
            #region Material
            if (productDTO.MaterialId <= 0)
                throw new ArgumentNullException(nameof(productDTO) + " invalid material ID");
            var material = await _unitOfWork.Materials.GetAsync(productDTO.MaterialId ?? default(int));
            if (material == null)
                throw new ArgumentNullException(nameof(productDTO) + " invalid material ID");
            #endregion
            #region Color
            if (productDTO.ColorId <= 0)
                throw new ArgumentNullException(nameof(productDTO) + " invalid color ID");
            var color = await _unitOfWork.Colors.GetAsync(productDTO.ColorId ?? default(int));
            if (color == null)
                throw new ArgumentNullException(nameof(productDTO) + " invalid color ID");
            #endregion
            #region Gender
            if (productDTO.GenderId <= 0)
                throw new ArgumentNullException(nameof(productDTO) + " invalid gender ID");
            var gender = await _unitOfWork.Genders.GetAsync(productDTO.GenderId ?? default(int));
            if (gender == null)
                throw new ArgumentNullException(nameof(productDTO) + " invalid gender ID");
            #endregion
            #endregion

            #region Sale

            if (productDTO.Sale != null)
            {
                if (DateTime.Compare(productDTO.Sale.StartDate, productDTO.Sale.EndDate) >= 0)
                    throw new BusinessException(nameof(DateTime) + " дата закінчення акції не може бути меншою ніж дата початку");
                if (productDTO.Sale.DiscountPercent > 100 || productDTO.Sale.DiscountPercent < 0)
                    throw new BusinessException("некоректний відсоток знижки");
            }


            #endregion


            Product product = _mapper.Map<Product>(productDTO);


            







            _unitOfWork.Products.Update(product);
            await _unitOfWork.SaveAsync();

            throw new NotImplementedException();
        }
    }
}
