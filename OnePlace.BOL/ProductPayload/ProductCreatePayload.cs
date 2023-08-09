using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.CodeAnalysis;
using OnePlace.BOL.DescriptionDTO;
using OnePlace.BOL.Picture;

namespace OnePlace.BOL.ProductPayload
{
    public class ProductCreatePayload
    {
        [Required]
        [StringLength(100, MinimumLength = 2)]
        public string Name { get; set; } = string.Empty;

        [Required]
        [RegularExpression(@"^[0-9]*${12}")]
        public string Code { get; set; } = string.Empty;

        [Required]
        [RegularExpression(@"^[0-9]*$")]
        [DataType(DataType.Currency)]
        public float Price { get; set; }

        [RegularExpression(@"^[0-9]*$")]
        public int? ManufacturerCountryId { get; set; }

        [RegularExpression(@"^[0-9]*$")]
        public int? ManufacturerId { get; set; }

        [RegularExpression(@"^[0-9]*$")]
        public int? MaterialId { get; set; }
       
        [RegularExpression(@"^[0-9]*$")]
        public int? ColorId { get; set; }
        
        [RegularExpression(@"^[0-9]*$")]
        public int? GenderId { get; set; }
       
        [Required]
        [RegularExpression(@"^[0-9]*$")]
        [NotNull]
        public int CategoryId { get; set; }
        
        [Required]
        [StringLength(2000, MinimumLength = 50)]
        public string Description { get; set; }
        
        public bool IsInBestProducts { get; set; } = false;
        
        public List<ProductDescriptionDTO>? Descriptions { get; set; }
       
        public List<ProductPictureDTO>? Pictures { get; set; }
    }
}
