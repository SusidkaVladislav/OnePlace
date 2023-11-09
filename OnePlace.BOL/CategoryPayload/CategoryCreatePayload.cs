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
        public string Name { get; set; }
        

        public string? PictureURL { get; set; }

        public string? DeletePictureURL { get; set; }


        public int? ParentId { get; set; }
    }
}
