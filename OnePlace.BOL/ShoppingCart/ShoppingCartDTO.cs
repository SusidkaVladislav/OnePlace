using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OnePlace.BOL.ShoppingCart
{
    public class ShoppingCartDTO
    { 
        public int ProductId { get; set; }
        public int ColorId { get; set; }
        public int Quantity { get; set; }
    }
}
