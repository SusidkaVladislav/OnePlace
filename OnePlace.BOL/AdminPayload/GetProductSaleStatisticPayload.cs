
using System.ComponentModel.DataAnnotations;

namespace OnePlace.BOL.AdminPayload
{
    public class GetProductSaleStatisticPayload
    {
        [Required]
        public int CategoryId { get; set; }
        
        [Required]
        public DateTime Period { get; set; }
    }
}
