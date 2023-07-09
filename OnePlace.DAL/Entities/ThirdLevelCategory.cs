using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OnePlace.DAL.Entities
{
    internal class ThirdLevelCategory
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int SecondLevelCategoryId { get; set; }
        public SecondLevelCategory SecondLevelCategory { get; set; }
    }
}
