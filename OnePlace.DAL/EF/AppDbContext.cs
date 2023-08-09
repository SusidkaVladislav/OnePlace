using OnePlace.DAL.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace OnePlace.DAL.EF
{
    public class AppDbContext : IdentityDbContext<User, Role, int>
    {
        private string connectionString;

        public System.Data.Entity.DbSet<Order> Orders { get; set; }
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
            Database.EnsureCreated();
        }

        public AppDbContext(string connectionString)
        {
            this.connectionString = connectionString;
        }
    }
}
