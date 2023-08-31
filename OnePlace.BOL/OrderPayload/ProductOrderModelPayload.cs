using System.ComponentModel.DataAnnotations;

namespace OnePlace.BOL.OrderPayload
{
    public class ProductOrderModelPayload
    {
        [Required]
        [RegularExpression(@"^[0-9]*$")]
        public int ProductId { get; set; }

        [Required]
        [RegularExpression(@"^[0-9]*$")]
        public int ColorId { get; set; }

        [Required]
        [RegularExpression(@"^[0-9]*$")]
        public int Quantity { get; set; }
    }
}
