using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OnePlace.BOL.Message
{
    public class UpdateMessagePayload
    {
        [Required]
        public int Id { get; set; }
        [Required]
        public bool IsReplied { get; set; }
    }
}
