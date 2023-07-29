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
    public class AppDbContext : IdentityDbContext<User>
    {
        public DbSet<Category> Categories { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<Color> Colors { get; set; }
        public DbSet<Delivery> Deliveries { get; set; }
        public DbSet<Description> Descriptions { get; set; }
        public DbSet<Gender> Genders { get; set; }
        public DbSet<LikedProduct> likedProducts { get; set; }
        public DbSet<ManufactureCountry> ManufactureCountries { get; set; }
        public DbSet<Manufacturer> Manufacturers { get; set; }
        public DbSet<Material> Materials { get; set; }
        public DbSet<OrderProduct> OrderProducts { get; set; }
        public DbSet<Picture> Pictures { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<ProductDescription> ProductDescriptions { get; set; }
        public DbSet<ProductPicture> ProductPictures { get; set; }
        public DbSet<Review> Reviews { get; set; }
        public DbSet<Sale> Sales { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Warehouse> Warehouses { get; set; }
        public DbSet<WarehouseProduct> WarehouseProducts { get; set; }
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
            Database.EnsureCreated();
        }
    }
}
