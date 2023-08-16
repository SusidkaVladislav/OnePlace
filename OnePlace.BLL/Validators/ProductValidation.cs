using OnePlace.BOL.Exceptions;
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

            //Валідація категорії
            await CategoryValid(productDTO.CategoryId);

            //Валідація країни-виробника
            await ManufacturerCountryValid(productDTO.ManufacturerCountryId);

            //Валідація по виробнику
            await ManufacturerValid(productDTO.ManufacturerId);

            //Валідація по матеріалі
            await MaterialValid(productDTO.MaterialId);

            //Валідація по кольорах
            await ColorValid(productDTO.ColorId);

            //Валідація за статтю
            await GenderValid(productDTO.GenderId);
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

        public async Task ManufacturerCountryValid(int? manufacturerCountryId)
        {
            if (manufacturerCountryId <= 0)
                throw new ArgumentNullException(nameof(Product) + " invalid manufacturer country ID");
            var country = await _unitOfWork.ManufactureCountries.GetAsync(manufacturerCountryId ?? default(int));
            if (country == null)
                throw new ArgumentNullException(nameof(Product) + " invalid manufacturer country ID");
        }

        public async Task ManufacturerValid(int? manufacturerId)
        {
            if (manufacturerId <= 0)
                throw new ArgumentNullException(nameof(Product) + " invalid manufacturer ID");
            var manufacturer = await _unitOfWork.Manufacturers.GetAsync(manufacturerId ?? default(int));
            if (manufacturer == null)
                throw new ArgumentNullException(nameof(Product) + " invalid manufacturer ID");
        }

        public async Task MaterialValid(int? materialId)
        {
            if (materialId <= 0)
                throw new ArgumentNullException(nameof(Product) + " invalid material ID");
            var material = await _unitOfWork.Materials.GetAsync(materialId ?? default(int));
            if (material == null)
                throw new ArgumentNullException(nameof(Product) + " invalid material ID");
        }

        public async Task ColorValid(int? colorId)
        {
            if (colorId <= 0)
                throw new ArgumentNullException(nameof(Product) + " invalid color ID");
            var color = await _unitOfWork.Colors.GetAsync(colorId ?? default(int));
            if (color == null)
                throw new ArgumentNullException(nameof(Product) + " invalid color ID");
        }

        public async Task GenderValid(int? genderId)
        {
            if (genderId <= 0)
                throw new ArgumentNullException(nameof(Product) + " invalid gender ID");
            var gender = await _unitOfWork.Genders.GetAsync(genderId ?? default(int));
            if (gender == null)
                throw new ArgumentNullException(nameof(Product) + " invalid gender ID");
        }

        public void SaleValid(SaleDTO sale)
        {
            if (sale == null)
                throw new ArgumentNullException(nameof(Sale));
            if (DateTime.Compare(sale.StartDate, sale.EndDate) >= 0)
                throw new BusinessException(nameof(DateTime) + " дата закінчення акції не може бути меншою ніж дата початку");
            if (sale.DiscountPercent > 100 || sale.DiscountPercent < 0)
                throw new BusinessException("некоректний відсоток знижки");
        }
    }
}
