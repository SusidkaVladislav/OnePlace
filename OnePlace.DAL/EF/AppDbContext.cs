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
        public DbSet<Description> Description { get; set; }
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
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Category>()
                .HasMany(c => c.ChildCategories)
                .WithOne(c => c.ParentCategory)
                .HasForeignKey(c => c.ParentCategoryId)
                .IsRequired(false);

            modelBuilder.Entity<Category>()
                .HasMany(c => c.Products)
                .WithOne(p => p.Category)
                .HasForeignKey(p => p.CategoryId);


            modelBuilder.Entity<Delivery>()
                .HasOne(d => d.Picture)
                .WithOne()
                .HasForeignKey<Delivery>(d => d.PictureId);

            modelBuilder.Entity<Gender>()
                .HasMany(g => g.Products)
                .WithOne(p => p.Gender)
                .HasForeignKey(p => p.GenderId);

            modelBuilder.Entity<ManufactureCountry>()
                .HasMany(mc => mc.Products)
                .WithOne(p => p.ManufactureCountry)
                .HasForeignKey(p => p.ManufactureCountryId);

            modelBuilder.Entity<Manufacturer>()
                .HasMany(m => m.Products)
                .WithOne(p => p.Manufacturer)
                .HasForeignKey(p => p.ManufacturerId);

            modelBuilder.Entity<Order>()
                .HasOne(o => o.User)
                .WithMany(u => u.Orders)
                .HasForeignKey(o => o.UserId);

            modelBuilder.Entity<Order>()
                .HasOne(o => o.Delivery)
                .WithMany()
                .HasForeignKey(o => o.DeliveryId);

            modelBuilder.Entity<Product>()
                .HasMany(p => p.Reviews)
                .WithOne(r => r.Product)
                .HasForeignKey(r => r.ProductId);

            modelBuilder.Entity<Product>()
                .HasMany(p => p.ProductDescriptions)
                .WithOne(pd => pd.Product)
                .HasForeignKey(pd => pd.ProductId);

            modelBuilder.Entity<Product>()
                .HasMany(p => p.ProductPictures)
                .WithOne(pp => pp.Product)
                .HasForeignKey(pp => pp.ProductId);

            modelBuilder.Entity<ProductDescription>()
                .HasKey(pd => new { pd.DescriptionId, pd.ProductId });

            modelBuilder.Entity<ProductPicture>()
                .HasKey(pp => new { pp.ProductId, pp.PictureId });

            modelBuilder.Entity<Review>()
                .HasOne(r => r.User)
                .WithMany(u => u.Reviews)
                .HasForeignKey(r => r.UserId);

            modelBuilder.Entity<WarehouseProduct>()
                .HasKey(wp => new { wp.WarehouseId, wp.ProductId });

            modelBuilder.Entity<LikedProduct>()
           .HasKey(lp => new { lp.UserId, lp.ProductId });

            modelBuilder.Entity<LikedProduct>()
                .HasOne(lp => lp.User)
                .WithMany(u => u.LikedProducts)
                .HasForeignKey(lp => lp.UserId);

            modelBuilder.Entity<LikedProduct>()
                .HasOne(lp => lp.Product)
                .WithMany()
                .HasForeignKey(lp => lp.ProductId);

            modelBuilder.Entity<Product>()
                .HasOne(p => p.Color)          
                .WithMany()                   
                .HasForeignKey(p => p.ColorId);

            modelBuilder.Entity<OrderProduct>()
                .HasKey(op => new { op.OrderId, op.ProductId });

            modelBuilder.Entity<OrderProduct>()
                .HasOne(op => op.Order)
                .WithMany()
                .HasForeignKey(op => op.OrderId);

            modelBuilder.Entity<OrderProduct>()
                .HasOne(op => op.Product)
                .WithMany()
                .HasForeignKey(op => op.ProductId);

            base.OnModelCreating(modelBuilder);
        }
    }
}
