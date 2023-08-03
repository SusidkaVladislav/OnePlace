using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OnePlace.DAL.Entities
{
    public class User : IdentityUser
    {
        public string Name { get; set; }
        public string Surname { get; set; }

        public ICollection<Order> Orders { get; } = new List<Order>();
        public ICollection<Review> Reviews { get; set; } = new List<Review>();
        public ICollection<LikedProduct> LikedProducts { get; set; } = new List<LikedProduct>();
        public ICollection<ShoppingCart> ShoppingCarts { get; set;} = new List<ShoppingCart>();
    }
}
