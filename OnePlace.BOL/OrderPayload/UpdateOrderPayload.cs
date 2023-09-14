using OnePlace.DAL.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OnePlace.BOL.OrderPayload
{
    public class UpdateOrderPayload
    {
        [Required]
        public int Id { get; set; }
        [Required]
        public string State { get; set; }
    }
}
