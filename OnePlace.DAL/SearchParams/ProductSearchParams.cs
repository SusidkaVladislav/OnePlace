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
        public decimal? MinPrice { get; set; } = null;

        /// <summary>
        /// Максимальна ціна продукту
        /// </summary>
        public decimal? MaxPrice { get; set; } = null;

        /// <summary>
        /// Стать 
        /// </summary>
        public HashSet<int>? Genders { get; set; } = null;

        /// <summary>
        /// Кольори товару
        /// </summary>
        public HashSet<int>? Colors { get; set; } = null;

        /// <summary>
        /// Країна виробника
        /// </summary>
        public HashSet<int>? ManufacturerCountries { get; set; } = null;

        /// <summary>
        /// Виробник
        /// </summary>
        public HashSet<int>? Manufacturers { get; set; } = null;

        /// <summary>
        /// Категорія
        /// </summary>
        public int Category { get; set; }


        public List<ProductDescriptionSearchParams>? Descriptions { get; set; } = null;

        /// <summary>
        /// Продукти зі знижкою
        /// </summary>
        public bool? WithDiscount { get; set; } = null;

        /// <summary>
        /// Продукти що розміщені за певною локацією
        /// </summary>
        public HashSet<string>? Locations { get; set; } = null;
    }
}
