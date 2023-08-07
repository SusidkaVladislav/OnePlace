using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using OnePlace.DAL.Entities;
using System.Data.Entity.ModelConfiguration.Conventions;

namespace OnePlace.DAL.EF
{
    public class AppDbContext : IdentityDbContext<User, Role, int>
    {
        public DbSet<Category> Categories { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<Color> Colors { get; set; }
        public DbSet<Delivery> Deliveries { get; set; }
        public DbSet<Description> Descriptions { get; set; }
        public DbSet<Gender> Genders { get; set; }
        public DbSet<LikedProduct> LikedProducts { get; set; }
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
        public DbSet<ShoppingCart> ShoppingCarts { get; set; }
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
            Database.EnsureCreated();
        }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            builder.Entity<LikedProduct>()
                .HasKey(x => new { x.UserId, x.ProductId });

            builder.Entity<OrderProduct>()
                .HasKey(x => new { x.OrderId, x.ProductId });

            builder.Entity<ProductDescription>()
                .HasKey(x => new { x.ProductId, x.DescriptionId });

            builder.Entity<ProductPicture>()
                .HasKey(x => new { x.PictureId, x.ProductId });

            builder.Entity<WarehouseProduct>()
                .HasKey(x => new { x.WarehouseId, x.ProductId });

            builder.Entity<ShoppingCart>()
                .HasKey(x => new { x.ProductId, x.UserId });

        }
    }
}
