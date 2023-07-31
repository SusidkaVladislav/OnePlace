using Microsoft.AspNetCore.Identity;

namespace OnePlace.DAL.Entities
{
    public class User: IdentityUser<int>
    {
        public string? Name { get; set; }
        public string? Surname { get; set; }

        //public ICollection<Order> Orders { get; } = new List<Order>();

    }
}
