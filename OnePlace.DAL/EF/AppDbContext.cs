using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using OnePlace.DAL.Entities;

namespace OnePlace.DAL.EF
{
    public class AppDbContext : IdentityDbContext<User, Role, int>
    {
        public System.Data.Entity.DbSet<Order> Orders { get; set; }
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
            Database.EnsureCreated();
        }

    }
}
