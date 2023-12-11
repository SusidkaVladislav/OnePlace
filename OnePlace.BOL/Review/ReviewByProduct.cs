namespace OnePlace.BOL.Review
{
    public class ReviewByProduct
    {
        public int Id { get; set; }
        public int NumberOfStars { get; set; }
        public string Comment { get; set; }
        public DateTime CommentDate { get; set; }
        public string UserInitials { get; set; }

        public string? AdminReplyComment { get; set; }
        public DateTime? AmindReplyDate { get; set; }

    }
}
