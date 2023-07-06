using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO.ThirdLevelCategory
{
    public class ThirdLevelCategoryDTO
    {
        public long ThirdLevelcategoryId { get; set; }
        public string ThirdLevelcategoryName { get; set; } = "";
        public long SecondLevelCategoryId { get; set; }
    }
}