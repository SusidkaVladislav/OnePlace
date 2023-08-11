using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OnePlace.BOL.Description
{
    public class ProductDescriptionSearchParams
    {
        public string Name { get; set; }
        public HashSet<string> Abouts { get; set; }
    }
}
