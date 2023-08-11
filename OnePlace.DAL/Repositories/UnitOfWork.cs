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

        public UnitOfWork(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
            Categories = new CategoryRepository(_appDbContext);
            Colors = new ColorReository(_appDbContext);
            Deliveries = new DeliveryRepository(_appDbContext);
            Descriptions = new DescriptionRepository(_appDbContext);
            Genders = new GenderRepository(_appDbContext);
            LikedProducts = new LikedProductRepository(_appDbContext);
            ManufactureCountries = new ManufactureCountryRepository(_appDbContext);
            Manufacturers = new ManufacturerRepository(_appDbContext);
            Materials = new MaterialRepository(_appDbContext);
            Orders = new OrderRepository(_appDbContext);
            OrderProducts = new OrderProductRepository(_appDbContext);
            Pictures = new PictureRepository(_appDbContext);
            Products = new ProductRepository(_appDbContext);
            ProductDescriptions = new ProductDescriptionRepository(_appDbContext);
            ProductPictures = new ProductPictureRepository(_appDbContext);
            Reviews = new ReviewRepository(_appDbContext);
            Sales = new SaleRepository(_appDbContext);
            Users = new UserRepository(_appDbContext);
            Warehouses = new WarehouseRepository(_appDbContext);
            WarehouseProducts = new WarehouseProductRepository(_appDbContext);
            ShoppingCarts = new ShoppingCartRepository(_appDbContext);
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
