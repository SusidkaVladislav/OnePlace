using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace OnePlace.BOL.CategoryPayload
{
    public class CategorUpdatePayload
    {
        public int Id { get; set; }
        [Required]
        [MaxLength(100)]
        [MinLength(2)]
        [DataType(DataType.Text)]
        [DisplayName("Назва")]
        public string Name { get; set; }

        [Required]
        public string PictureAddress { get; set; }
    }
}
