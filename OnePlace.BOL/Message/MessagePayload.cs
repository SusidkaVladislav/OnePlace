using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OnePlace.BOL.Message
{
    public class MessagePayload
    {
        [Required]
        public int ProductId { get; set; }
        [Required]
        [MaxLength(50)]
        [MinLength(2)]
        [DataType(DataType.Text)]
        public string Name { get; set; }
        [Required]
        [DataType(DataType.EmailAddress)]
        public string Email { get; set; }
        [Required]
        [MinLength(5)]
        [DataType(DataType.Text)]
        public string MessageText { get; set; }
        [Required]
        public DateTime Date { get; set; }
    }
}
