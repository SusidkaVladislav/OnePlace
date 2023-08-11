namespace OnePlace.BLL.Utilities
{
    /// <summary>
    /// Базові параметри фільтрування 
    /// </summary>
    public class BaseSearchParams
    {/// <summary>
     /// Сторінка з якої почати вибір продуктів
     /// </summary>
        public int? Page { get; set; } = 1;

        /// <summary>
        /// Кількість продуктів з сторінки
        /// </summary>
        public int? Limit { get; set; } = 10;
    }
}
