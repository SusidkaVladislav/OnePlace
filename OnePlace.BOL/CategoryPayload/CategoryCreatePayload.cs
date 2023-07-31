using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace OnePlace.BOL.CategoryPayload
{
    public class CategoryCreatePayload
    {
        [Required]
        [MaxLength(100)]
        [MinLength(2)]
        [DataType(DataType.Text)]
        [DisplayName("Назва")]
        public string Name { get; set; } = string.Empty;
        public int? ParentId { get; set; }
    }
}
