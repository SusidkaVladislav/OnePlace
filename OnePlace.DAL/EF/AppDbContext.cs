using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using OnePlace.DAL.Entities;

namespace OnePlace.DAL.EF
{
    public class AppDbContext : IdentityDbContext<User, Role, int>
    {
        #region DbSets
        public DbSet<Category> Categories { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<Color> Colors { get; set; }
        public DbSet<Description> Descriptions { get; set; }
        public DbSet<LikedProduct> LikedProducts { get; set; }
        public DbSet<ManufactureCountry> ManufactureCountries { get; set; }
        public DbSet<Manufacturer> Manufacturers { get; set; }
        public DbSet<OrderProduct> OrderProducts { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<Picture> Pictures { get; set; }
        public DbSet<ProductDescription> ProductDescriptions { get; set; }
        public DbSet<ProductPicture> ProductPictures { get; set; }
        public DbSet<ProductColor> ProductColors { get; set; }
        public DbSet<Review> Reviews { get; set; }
        public DbSet<ReviewReply> ReviewReplies { get; set; }
        public DbSet<Sale> Sales { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<ShoppingCart> ShoppingCarts { get; set; }
        public DbSet<Message> Messages { get; set; }
        public DbSet<CreditCard> CreditCards { get; set; }
        #endregion

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
                .HasKey(x => new { x.OrderId, x.ProductId, x.ColorId });

            builder.Entity<ProductDescription>()
                .HasKey(x => new { x.DescriptionId, x.ProductId });

            builder.Entity<ProductPicture>()
                .HasKey(x => new { x.ProductId, x.PictureId });

            builder.Entity<ProductColor>()
                 .HasKey(x => new { x.ProductId, x.ColorId });

            builder.Entity<ShoppingCart>()
                .HasKey(x => new { x.ProductId, x.UserId, x.ColorId });

            builder.Entity<ReviewReply>()
                .HasKey(x => x.ReviewId);
        }
    }
}
