namespace OnePlace.DAL.Entities
{
    public class Review
    {
        public int Id { get; set; }
        public int NumberOfStars { get; set; }
        public string Comment { get; set; }
        public DateTime Date { get; set; }
        public int ProductId { get; set; }
        public Product Product { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }
        public ReviewReply? ReviewReply { get; set; }
    }
}
