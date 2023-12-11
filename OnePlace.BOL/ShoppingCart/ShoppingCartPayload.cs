using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OnePlace.BOL.ShoppingCart
{
    public class ShoppingCartPayload
    {
        [Required]
        public int ProductId { get; set; }
        [Required]
        public int ColorId { get; set; }
        [Required]
        [Range(1, int.MaxValue)]
        public int Quantity { get; set; }

    }
}
