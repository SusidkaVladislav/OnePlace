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
        public IRepository<Description, int> Descriptions { get; private set; }
        public IRepository<LikedProduct, Composite2Key> LikedProducts { get; private set; }
        public IRepository<ManufactureCountry, int> ManufactureCountries { get; private set; }
        public IRepository<Manufacturer, int> Manufacturers { get; private set; }
        public IRepository<Order, int> Orders { get; private set; }
        public IRepository<OrderProduct, Composite3Key> OrderProducts { get; private set; }
        public IRepository<Picture, int> Pictures { get; private set; }
        public IRepository<Product, int> Products { get; private set; }
        public IRepository<ProductDescription, Composite2Key> ProductDescriptions { get; private set; }
        public IRepository<ProductPicture, Composite2Key> ProductPictures { get; private set; }
        public IRepository<Review, int> Reviews { get; private set; }
        public IRepository<Sale, int> Sales { get; private set; }
        public IRepository<User, int> Users { get; private set; }
        public IRepository<ProductColor, Composite2Key> ProductColors { get; private set; }
        public IRepository<ShoppingCart, Composite3Key> ShoppingCarts { get; private set; }
        public IRepository<Message, int> Messages { get; private set; }
        public IRepository<ReviewReply, int> ReviewReplies { get; private set; }
        public IRepository<CreditCard, int> CreditCards { get; private set; }
        #endregion

        public UnitOfWork(AppDbContext appDbContext, UserManager<User> userManager)
        {
            _appDbContext = appDbContext;
            Categories = new CategoryRepository(_appDbContext, userManager);
            Colors = new ColorReository(_appDbContext, userManager);
            Descriptions = new DescriptionRepository(_appDbContext, userManager);
            LikedProducts = new LikedProductRepository(_appDbContext, userManager);
            ManufactureCountries = new ManufactureCountryRepository(_appDbContext, userManager);
            Manufacturers = new ManufacturerRepository(_appDbContext, userManager);
            Orders = new OrderRepository(_appDbContext, userManager);
            OrderProducts = new OrderProductRepository(_appDbContext, userManager);
            Pictures = new PictureRepository(_appDbContext, userManager);
            Products = new ProductRepository(_appDbContext, userManager);
            ProductDescriptions = new ProductDescriptionRepository(_appDbContext, userManager);
            ProductPictures = new ProductPictureRepository(_appDbContext, userManager);
            Reviews = new ReviewRepository(_appDbContext, userManager);
            Sales = new SaleRepository(_appDbContext, userManager);
            Users = new UserRepository(_appDbContext, userManager);
            ProductColors = new ProductColorRepository(_appDbContext, userManager);
            ShoppingCarts = new ShoppingCartRepository(_appDbContext, userManager);
            Messages = new MessageRepository(_appDbContext, userManager);
            ReviewReplies = new ReviewReplyRepository(_appDbContext, userManager);
            CreditCards = new CreditCardRepository(_appDbContext, userManager);
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
