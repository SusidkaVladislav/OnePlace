using OnePlace.BOL.Review;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OnePlace.BOL.ReviewReply
{
    public class ReviewReplyDTO
    {
        public int ReviewId { get; set; }
        public ReviewDTO Review { get; set; }
        public string Comment { get; set; }
        public DateTime Date { get; set; }
    }
}
