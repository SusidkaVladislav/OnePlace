using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OnePlace.DAL.Entities
{
    internal class SecondLevelCategory
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int FirstLevelCategoryId { get; set; }
        public FirstLevelCategory FirstLevelCategory { get; set; }
    }
}
