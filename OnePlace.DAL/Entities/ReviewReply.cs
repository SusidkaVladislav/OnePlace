using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OnePlace.DAL.Entities
{
    public class ReviewReply
    {
        public int ReviewId { get; set; }
        public string Comment { get; set; }
        public DateTime Date { get; set; }
    }
}
