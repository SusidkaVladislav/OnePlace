using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OnePlace.DAL.Entities
{
    public class Message
    {
        public int Id { get; set; }
        public int? UserId { get; set; }
        public User? User { get; set; }
        public int ProductId { get; set; }
        public Product Product { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string MessageText { get; set; }
        public DateTime Date { get; set; }
        public bool IsReplied { get; set; }
    }
}
