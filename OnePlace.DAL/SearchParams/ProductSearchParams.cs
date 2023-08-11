namespace OnePlace.DAL.SearchParams
{
    /// <summary>
    /// Параметри пошуку продукту
    /// </summary>
    public class ProductSearchParams: BaseSearchParams
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
        public HashSet<int>? ManufacturerCountries { get; set; }

        /// <summary>
        /// Виробник
        /// </summary>
        public HashSet<int>? Manufacturers { get; set; }

        /// <summary>
        /// Категорія
        /// </summary>
        public int? Category { get; set; }

        /// <summary>
        /// Набір характеристик за яими фільтрується продукт
        /// </summary>
        public HashSet<ProductDescriptionSearchParams>? Descriptions { get; set; }

        /// <summary>
        /// Продукти зі знижкою
        /// </summary>
        public bool? WithDiscount { get; set; }

        /// <summary>
        /// Продукти що розміщені за певною локацією
        /// </summary>
        public HashSet<string>? Locations { get; set; }
    }
}
