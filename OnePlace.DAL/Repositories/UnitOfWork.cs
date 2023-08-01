using OnePlace.DAL.EF;
using OnePlace.DAL.Entities;
using OnePlace.DAL.Interfaces;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace OnePlace.DAL.Repositories
{
    public class UnitOfWork : IUnitOfWork
    {
        private AppDbContext _appDbContext;

        public IRepository<Category> Categories { get; private set; }
        public IRepository<Color> Colors { get; private set; }

        public IRepository<Delivery> Deliveries { get; private set; }

        public IRepository<Description> Descriptions { get; private set; }

        public IRepository<Gender> Genders { get; private set; }

        public IRepository<LikedProduct> LikedProducts { get; private set; }

        public IRepository<ManufactureCountry> ManufactureCountries { get; private set; }

        public IRepository<Manufacturer> Manufacturers { get; private set; }

        public IRepository<Material> Materials { get; private set; }

        public IRepository<Order> Orders { get; private set; }

        public IRepository<OrderProduct> OrderProducts { get; private set; }

        public IRepository<Picture> Pictures { get; private set; }

        public IRepository<Product> Products { get; private set; }

        public IRepository<ProductDescription> ProductDescriptions { get; private set; }

        public IRepository<ProductPicture> ProductPictures { get; private set; }

        public IRepository<Review> Reviews { get; private set; }

        public IRepository<Sale> Sales { get; private set; }

        public IRepository<User> Users { get; private set; }

        public IRepository<Warehouse> Warehouses { get; private set; }

        public IRepository<WarehouseProduct> WarehouseProducts { get; private set; }

        public UnitOfWork(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
            Categories = new CategoryRepository(_appDbContext);
            Colors = new ColorReository(_appDbContext);
            Deliveries = new DeliveryRepository(_appDbContext);
            Descriptions = new DescriptionRepository(_appDbContext);
            Genders = new GenderRepository(_appDbContext);
        }

        public void Dispose()
        {
            _appDbContext.Dispose();
        }

        public void Save()
        {
            _appDbContext.SaveChanges();
        }
    }
}
