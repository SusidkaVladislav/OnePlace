using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OnePlace.BOL.Message
{
    public class MessageDTO
    {
        public int ProductId { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string MessageText { get; set; }
        public DateTime Date { get; set; }
        public bool IsReplied { get; set; }
    }
}
