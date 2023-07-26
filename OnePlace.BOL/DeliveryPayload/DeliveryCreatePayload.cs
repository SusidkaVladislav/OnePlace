using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OnePlace.BOL.DeliveryPayload
{
    public class DeliveryCreatePayload
    {
        [Required]
        public string Name { get; set; }
        public string Picture { get; set; }
    }
}
