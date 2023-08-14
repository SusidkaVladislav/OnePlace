using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OnePlace.DAL.SearchParams
{
    public class ProductDescriptionSearchParams
    {
        public string Name { get; set; }
        public List<string> Abouts { get; set; }
    }
}
