using OnePlace.BOL.Description;
using OnePlace.BOL.Picture;
using OnePlace.BOL.Sale;
using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;

namespace OnePlace.BOL.ProductPayload
{
    public class ProductUpdatePayload
    {
        [Required]
        public int Id { get; set; }

        [Required]
        [RegularExpression(@"^[0-9]*${4}")]
        public string Code { get; set; }

        [Required]
        [DataType(DataType.Text)]
        [StringLength(100, MinimumLength = 2)]
        public string Name { get; set; }

        [Required]
        [RegularExpression(@"^[0-9]*$")]
        [DataType(DataType.Currency)]
        public decimal Price { get; set; }

        [Required]
        [RegularExpression(@"^[0-9]*$")]
        public int ManufacturerCountryId { get; set; }
        
        [Required]
        [RegularExpression(@"^[0-9]*$")]
        public int ManufacturerId { get; set; }
        
        [Required]
        [RegularExpression(@"^[0-9]*$")]
        public int MaterialId { get; set; }
        
        [Required]
        [RegularExpression(@"^[0-9]*$")]
        public int ColorId { get; set; }
        
        [Required]
        [RegularExpression(@"^[0-9]*$")]
        public int GenderId { get; set; }

        [Required]
        [StringLength(2000, MinimumLength = 20)]
        public string Description { get; set; }

        [Required]
        [RegularExpression(@"^[0-9]*$")]
        [NotNull]
        public int CategoryId { get; set; }

        public bool IsInBestProducts { get; set; }

        //[Required]
        //public WarehouseDetails Warehouse { get; set; }
        
        public SaleDetails? Sale { get; set; }
        
        public List<ProductDescriptionDetails>? Descriptions { get; set; }
        
        [Required]
        public List<ProductPictureDetails> Pictures { get; set; }
    }
}
