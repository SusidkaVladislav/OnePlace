using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO.SecondLevelCategory
{
    public class SecondLevelCategoryToAddDTO
    {
        public string SecondLevelcategoryName { get; set; } = "";
        public long FirstLevelCategoryId { get; set; }
    }
}
