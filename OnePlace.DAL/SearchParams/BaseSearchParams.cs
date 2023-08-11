using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OnePlace.DAL.SearchParams
{
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
