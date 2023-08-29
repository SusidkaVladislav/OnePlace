using Microsoft.EntityFrameworkCore;

namespace OnePlace.DAL.Entities
{
    [PrimaryKey("ReviewId")]
    public class ReviewReply
    {
        public int ReviewId { get; set; }
        public Review Review { get; set; }
        public string Comment { get; set; }
        public DateTime Date { get; set; }
    }
}
