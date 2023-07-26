using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OnePlace.BOL.CategoryPayload
{
    public class CategoryPayload
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public int? idParent { get; set; }
    }
}
