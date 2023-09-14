﻿using OnePlace.BOL.Exceptions;
using OnePlace.BOL.Picture;
using OnePlace.BOL.ProductColor;
using OnePlace.BOL.ProductDTO;
using OnePlace.BOL.Sale;
using OnePlace.DAL.Entities;
using OnePlace.DAL.Interfaces;

namespace OnePlace.BLL.Validators
{
    public class ProductValidation
    {
        private IUnitOfWork _unitOfWork;

        public ProductValidation(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="productDTO"></param>
        /// <returns></returns>
        public async Task Validate(BaseProduct productDTO)
        {
            //Валідація країни-виробника
            await ManufacturerCountryValidAsync(productDTO.ManufacturerCountryId);

            //Валідація по виробнику
            await ManufacturerValidAsync(productDTO.ManufacturerId);

            CodeValid(productDTO.Code);
        }

        /// <summary>
        /// Category validate
        /// </summary>
        /// <param name="categoryId"></param>
        /// <returns></returns>
        /// <exception cref="ArgumentNullException"></exception>
        /// <exception cref="BusinessException"></exception>
        public async Task CategoryValid(int categoryId)
        {
            CategoryValidation categoryValidation = new CategoryValidation(_unitOfWork);

            if (categoryId <= 0)
                throw new ArgumentNullException(nameof(Product) + " no categiry ID");

            //Перевірити чи є категорія за вказаним id
            if (!await categoryValidation.Exists(categoryId))
                throw new ArgumentNullException(nameof(Product) + " invalid category ID");

            //Продукт не можна вставляти в ту категорію, яка має вже підкатегорії

            if (await categoryValidation.HasSubCategory(categoryId))
                throw new BusinessException(nameof(Category) + " в цю категорію не можна добавляти продукти," +
                    "тому що йя категорія містить підкатегорії");
        }

        public async Task<int> ManufacturerCountryValidAsync(int manufacturerCountryId)
        {
            if (manufacturerCountryId <= 0)
                throw new ArgumentNullException(nameof(Product) + " invalid manufacturer country ID");
            var country = await _unitOfWork.ManufactureCountries.GetAsync(manufacturerCountryId);
            if (country is null)
                throw new ArgumentNullException(nameof(Product) + " invalid manufacturer country ID");

            return country.Id;
        }

        public async Task<int> ManufacturerValidAsync(int manufacturerId)
        {
            if (manufacturerId <= 0)
                throw new ArgumentNullException(nameof(Product) + " invalid manufacturer ID");
            var manufacturer = await _unitOfWork.Manufacturers.GetAsync(manufacturerId);
            if (manufacturer is null)
                throw new ArgumentNullException(nameof(Product) + " invalid manufacturer ID");

            return manufacturer.Id;
        }

        public async Task ProductColorsValid(List<ProductColorDTO> productColors)
        {
            //ProductColorDTO
            if (!productColors.Any()) 
                throw new ArgumentNullException("color is necessary");
            

            foreach (var productColor in productColors)
            {
                //Перевірка на унікальність кольорів
                if (productColors.Select(c => c.ColorId)
                    .Where(x => x == productColor.ColorId).Count() > 1)
                    throw new BusinessException("multiple identical colors");
                
                //Валідація самого кольору
                await ColorValidAsync(productColor.ColorId);
                
                //Валідація ціни
                PriceValid(productColor.Price);
                
                //Валідація кількості товару
                if (productColor.Quantity < 0)
                    throw new BusinessException("quantity can`t be less then zero");
            
            }
        }

        public async Task<int> ColorValidAsync(int colorId)
        {
            if (colorId <= 0)
                throw new ArgumentNullException(nameof(Product) + " invalid color ID");
            var color = await _unitOfWork.Colors.GetAsync(colorId);
            if (color is null)
                throw new ArgumentNullException(nameof(Product) + " invalid color ID");
        
            return color.Id;
        }

        public async void CodeValid(string code)
        {
            if (code.Length < 4)
                throw new BusinessException(nameof(code) + " minimum length is 4");
        }

        public void PriceValid(decimal price)
        {
            if (price <= 0)
                throw new BusinessException(nameof(price) + " can`t be negative or 0");
        }

        public void SaleValid(SaleDTO? sale)
        {
            if (sale != null)
            {
                if (DateTime.Compare(sale.StartDate.Date, DateTime.UtcNow.Date) < 0
                    || DateTime.Compare(sale.EndDate.Date, DateTime.UtcNow.Date) < 0)
                    throw new BusinessException("Дата початку та кінця акції не може бути раніша за сьогоднішню");
                if (DateTime.Compare(sale.StartDate.Date, sale.EndDate.Date) >= 0)
                    throw new BusinessException(nameof(DateTime) + " дата закінчення акції не може бути меншою ніж дата початку");
                if (sale.DiscountPercent > 100 || sale.DiscountPercent < 0)
                    throw new BusinessException("некоректний відсоток знижки");
            }
        }

        public void PictureValid(List<ProductPictureDTO> productPicture)
        {
            if (productPicture.Count == 0)
                throw new ArgumentNullException(nameof(Picture) + " no pictures");
            if (productPicture.Where(p => p.IsTitle == true).Count() == 0)
                throw new BusinessException("no title picture");
            if (productPicture.Where(p => p.IsTitle == true).Count() >= 2)
                throw new BusinessException("more than one title pictures");
        }
    }
}