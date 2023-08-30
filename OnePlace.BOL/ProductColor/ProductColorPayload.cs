using System.ComponentModel.DataAnnotations;

namespace OnePlace.BOL.ProductColor
{
    public class ProductColorPayload
    {
        [Required]
        [RegularExpression(@"^[0-9]*$")]
        public int ColorId { get; set; }

        [Required]
        [DataType(DataType.Currency)]
        public decimal Price { get; set; }

        [Required]
        [RegularExpression(@"^[0-9]*$")]
        public int Quantity { get; set; }
    }
}
