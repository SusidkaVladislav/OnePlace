using System.ComponentModel.DataAnnotations;

namespace OnePlace.BOL.ProductPayload
{
    public class PayloadProductIdColorId
    {
        [Required]
        public int ProductId { get; set; }
        [Required]
        public int ColorId { get; set; }
    }
}
