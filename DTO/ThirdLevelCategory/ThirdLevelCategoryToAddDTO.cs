using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO.ThirdLevelCategory
{
    public class ThirdLevelCategoryToAddDTO
    {
        public string ThirdLevelcategoryName { get; set; } = "";
        public long SecondLevelCategoryId { get; set; }
    }
}
