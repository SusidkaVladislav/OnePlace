using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OnePlace.BOL.CategoryPayload
{
    public class CategoryCreatePayload
    {
        [Required]
        [MaxLength(100)]
        [MinLength(2, ErrorMessage = "Category name must contains at least 2 letters")]
        [DataType(DataType.Text)]
        [DisplayName("Name")]
        public string Name { get; set; } = string.Empty;
        public int? idParent { get; set; }
    }
}
