using OnePlace.BOL.DescriptionDTO;

namespace OnePlace.BLL.Utilities
{
    /// <summary>
    /// Параметри пошуку продукту
    /// </summary>
    public class ProductSearchParams
    {
        /// <summary>
        /// Мінімальа ціна продукту
        /// </summary>
        public float? MinPrice { get; set; }

        /// <summary>
        /// Максимальна ціна продукту
        /// </summary>
        public float? MaxPrice { get; set; }
        
        /// <summary>
        /// Стать 
        /// </summary>
        public HashSet<int>? Genders { get; set; }

        /// <summary>
        /// Кольори товару
        /// </summary>
        public HashSet<int>? Colors { get; set; }

        /// <summary>
        /// Країна виробника
        /// </summary>
        public int? ManufacturerCountry { get; set; }

        /// <summary>
        /// Виробник
        /// </summary>
        public int? Manufacturer { get; set; }

        /// <summary>
        /// Категорія
        /// </summary>
        public int? Category { get; set; }

        /// <summary>
        /// Набір характеристик за яими фільтрується продукт
        /// </summary>
        public HashSet<ProductDescription> Descriptions { get; set; }

        /// <summary>
        /// Продукти зі знижкою
        /// </summary>
        public bool WithDiscount { get; set; }

        /// <summary>
        /// Продукти що розміщені за певною локацією
        /// </summary>
        public string? Location { get; set; }

        /// <summary>
        /// Сторінка з якої почати вибір продуктів
        /// </summary>
        public int? Page { get; set; } = 1;

        /// <summary>
        /// Кількість продуктів з сторінки
        /// </summary>
        public int? Limit { get; set; } = 10;
    }
}
