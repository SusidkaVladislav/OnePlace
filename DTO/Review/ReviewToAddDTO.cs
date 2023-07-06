using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO.Review
{
    public class ReviewToAddDTO
    {
        public long ProductId { get; set; }
        public int NumberOfStars { get; set; }
        public string Comment { get; set; } = "";
        public DateTime Date { get; set; }
        public long UserId { get; set; }
    }
}
