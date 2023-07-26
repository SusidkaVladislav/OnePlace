using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.CodeAnalysis;
using OnePlace.BOL.DescriptionDTO;

namespace OnePlace.BOL.ProductPayload
{
    public class ProductCreatePayload
    {
        [Required(ErrorMessage = "Enter name of the product")]
        [StringLength(100, MinimumLength = 2, ErrorMessage = "Product name must have at least 2 characters")]
        public string Name { get; set; } = string.Empty;

        [Required(ErrorMessage = "Enter code of the product")]
        [RegularExpression(@"^[0-9]*${12}", ErrorMessage = "Product code has to contain only numbers")]
        public string Code { get; set; } = string.Empty;

        [Required(ErrorMessage = "Enter price of the product")]
        [RegularExpression(@"^[0-9]*$", ErrorMessage = "")]
        [DataType(DataType.Currency)]
        public float Price { get; set; }

        [RegularExpression(@"^[0-9]*$")]
        public int? ManufacturerCountryId { get; set; }

        [RegularExpression(@"^[0-9]*$")]
        public int? ManufacturerId { get; set; }

        [RegularExpression(@"^[0-9]*$")]
        //[NotMapped]
        public int? MaterialId { get; set; }
        [RegularExpression(@"^[0-9]*$")]
        public int? ColorId { get; set; }
        [RegularExpression(@"^[0-9]*$")]
        public int? GenderId { get; set; }
        [Required(ErrorMessage = "Category is necessary")]
        [RegularExpression(@"^[0-9]*$")]
        [NotNull]
        public int CategoryId { get; set; }
        [Required(ErrorMessage = "Enter porduct description")]
        [StringLength(2000, MinimumLength = 50, ErrorMessage = "Product description must have at least 50 characters")]
        public string Description { get; set; } = string.Empty;
        public bool IsInBestProducts { get; set; } = false;
        public HashSet<ProductDescription>? Descriptions { get; set; }
        public HashSet<string>? Pictures { get; set; }
    }
}
