using Microsoft.AspNetCore.Identity;
using OnePlace.DAL.EF;
using OnePlace.DAL.Entities;
using OnePlace.DAL.Interfaces;

namespace OnePlace.DAL.Repositories
{
    public class UnitOfWork : IUnitOfWork
    {
        private AppDbContext _appDbContext;

        #region IRepositories
        public IRepository<Category, int> Categories { get; private set; }
        public IRepository<Color, int> Colors { get; private set; }
        public IRepository<Delivery, int> Deliveries { get; private set; }
        public IRepository<Description, int> Descriptions { get; private set; }
        public IRepository<Gender, int> Genders { get; private set; }
        public IRepository<LikedProduct, CompositeKey> LikedProducts { get; private set; }
        public IRepository<ManufactureCountry, int> ManufactureCountries { get; private set; }
        public IRepository<Manufacturer, int> Manufacturers { get; private set; }
        public IRepository<Material, int> Materials { get; private set; }
        public IRepository<Order, int> Orders { get; private set; }
        public IRepository<OrderProduct, CompositeKey> OrderProducts { get; private set; }
        public IRepository<Picture, int> Pictures { get; private set; }
        public IRepository<Product, int> Products { get; private set; }
        public IRepository<ProductDescription, CompositeKey> ProductDescriptions { get; private set; }
        public IRepository<ProductPicture, CompositeKey> ProductPictures { get; private set; }
        public IRepository<Review, int> Reviews { get; private set; }
        public IRepository<Sale, int> Sales { get; private set; }
        public IRepository<User, int> Users { get; private set; }
        public IRepository<Warehouse, int> Warehouses { get; private set; }
        public IRepository<WarehouseProduct, CompositeKey> WarehouseProducts { get; private set; }
        public IRepository<ShoppingCart, CompositeKey> ShoppingCarts { get; private set; }
        #endregion

        public UnitOfWork(AppDbContext appDbContext, UserManager<User> userManager)
        {
            _appDbContext = appDbContext;
            Categories = new CategoryRepository(_appDbContext, userManager);
            Colors = new ColorReository(_appDbContext, userManager);
            Deliveries = new DeliveryRepository(_appDbContext, userManager);
            Descriptions = new DescriptionRepository(_appDbContext, userManager);
            Genders = new GenderRepository(_appDbContext, userManager);
            LikedProducts = new LikedProductRepository(_appDbContext, userManager);
            ManufactureCountries = new ManufactureCountryRepository(_appDbContext, userManager);
            Manufacturers = new ManufacturerRepository(_appDbContext, userManager);
            Materials = new MaterialRepository(_appDbContext, userManager);
            Orders = new OrderRepository(_appDbContext, userManager);
            OrderProducts = new OrderProductRepository(_appDbContext, userManager);
            Pictures = new PictureRepository(_appDbContext, userManager);
            Products = new ProductRepository(_appDbContext, userManager);
            ProductDescriptions = new ProductDescriptionRepository(_appDbContext, userManager);
            ProductPictures = new ProductPictureRepository(_appDbContext, userManager);
            Reviews = new ReviewRepository(_appDbContext, userManager);
            Sales = new SaleRepository(_appDbContext, userManager);
            Users = new UserRepository(_appDbContext, userManager);
            Warehouses = new WarehouseRepository(_appDbContext, userManager);
            WarehouseProducts = new WarehouseProductRepository(_appDbContext, userManager);
            ShoppingCarts = new ShoppingCartRepository(_appDbContext, userManager);
        }

        public async void Dispose()
        {
            await _appDbContext.DisposeAsync();
        }


        public async Task SaveAsync()
        {
            await _appDbContext.SaveChangesAsync();
        }
    }
}
