using Microsoft.AspNetCore.Identity;

namespace OnePlace.DAL.Entities
{
    public class User: IdentityUser<int>
    {
        public string? Name { get; set; }
        public string? Surname { get; set; }
        public string? PictureAddress { get; set; }
        public DateTime RegistrationDate { get; set; }

        public string? Photo { get; set; }

        public ICollection<Order> Orders { get; } = new List<Order>();
        public ICollection<Review> Reviews { get; set; } = new List<Review>();
        public ICollection<LikedProduct> LikedProducts { get; set; } = new List<LikedProduct>();
        public ICollection<ShoppingCart> ShoppingCarts { get; set;} = new List<ShoppingCart>();
        public ICollection<Message> Messages { get; set; } = new List<Message>();
        public ICollection<CreditCard> CreditCards { get; set;} = new List<CreditCard>();
    }
}
