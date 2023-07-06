using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO.Review
{
    public class ReviewDTO
    {
        public long Id { get; set; }
        public long ProductId { get; set; }
        public int NumberOfStars { get; set; }
        public string Comment { get; set; } = "";
        public DateTime Date { get; set; }
        public long UserId { get; set; }
    }
}
