using OnePlace.BOL.DescriptionDTO;
using OnePlace.BOL.Picture;
using OnePlace.BOL.ProductColor;
using OnePlace.BOL.Sale;
using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;

namespace OnePlace.BOL.ProductPayload
{
    public class ProductCreatePayload
    {
        [Required]
        [StringLength(100, MinimumLength = 2)]
        public string Name { get; set; } = string.Empty;

        [Required]
        [RegularExpression(@"^[0-9]*${4}")]
        public string Code { get; set; } = string.Empty;

        [Required]
        [RegularExpression(@"^[0-9]*$")]
        public int ManufacturerCountryId { get; set; }

        [Required]
        [RegularExpression(@"^[0-9]*$")]
        public int ManufacturerId { get; set; }

        [Required]
        [RegularExpression(@"^[0-9]*$")]
        [NotNull]
        public int CategoryId { get; set; }
        
        [Required]
        [StringLength(2000, MinimumLength = 20)]
        public string Description { get; set; }

        public SaleDTO? Sale { get; set; }

        public bool IsInBestProducts { get; set; } = false;

        public List<ProductDescriptionDTO>? Descriptions { get; set; }

        [Required]
        public List<ProductPictureDTO> Pictures { get; set; }
        
        [Required]
        public List<ProductColorPayload> ProductColors { get; set; }
    }
}