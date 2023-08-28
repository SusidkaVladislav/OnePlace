namespace OnePlace.DAL.Entities
{
    public class CreditCard
    {
        public int Id { get; set; }
        public string CardNumber { get; set; }
        public string ExpirationDate { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }
    }
}
