//using OnePlace.DAL.EF;
//using OnePlace.DAL.Entities;
//using OnePlace.DAL.Interfaces;

//namespace OnePlace.DAL.Repositories
//{
//    public class EFUnitOfWork : IUnitOfWork
//    {
//        private AppDbContext db;

//        private CategoryRepository categoryRepository;
//        private ColorRepository colorRepository;
//        private DeliveryRepository deliveryRepository;
//        private DescriptionRepository descriptionRepository;
//        private GenderRepository genderRepository;
//        private LikedProductRepository likedProductRepository;
//        private ProductRepository productRepository;
//        private ManufactureCountryRepository manufactureCountryRepository;
//        private ManufacturerRepository manufacturerRepository;
//        private MaterialRepository materialRepository;
//        private OrderProductRepository orderProductRepository;
//        private OrderRepository orderRepository;
//        private PictureRepository pictureRepository;
//        private ProductDescriptionRepository productDescriptionRepository;
//        private ProductPictureRepository productPictureRepository;
//        private ReviewRepository reviewRepository;
//        private SaleRepository saleRepository;
//        private ShoppingCartRepository shoppingCartRepository;
//        private UserRepository userRepository;
//        private WarehouseProductRepository warehouseProductRepository;
//        private WarehouseRepository warehouseRepository;
//        public EFUnitOfWork(string connectionString)
//        {
           
//        }
//        public IRepository<Category, int> Categories => throw new NotImplementedException();

//        public IRepository<Color, int> Colors => throw new NotImplementedException();

//        public IRepository<Delivery, int> Deliveries => throw new NotImplementedException();

//        public IRepository<Description, int> Descriptions => throw new NotImplementedException();

//        public IRepository<Gender, int> Genders => throw new NotImplementedException();

//        public IRepository<LikedProduct, CompositeKey> LikedProducts => throw new NotImplementedException();

//        public IRepository<ManufactureCountry, int> ManufactureCountries => throw new NotImplementedException();

//        public IRepository<Manufacturer, int> Manufacturers => throw new NotImplementedException();

//        public IRepository<Material, int> Materials => throw new NotImplementedException();

//        public IRepository<Order, int> Orders => throw new NotImplementedException();

//        public IRepository<OrderProduct, CompositeKey> OrderProducts => throw new NotImplementedException();

//        public IRepository<Picture, int> Pictures => throw new NotImplementedException();

//        public IRepository<Product, int> Products => throw new NotImplementedException();

//        public IRepository<ProductDescription, CompositeKey> ProductDescriptions => throw new NotImplementedException();

//        public IRepository<ProductPicture, CompositeKey> ProductPictures => throw new NotImplementedException();

//        public IRepository<Review, int> Reviews => throw new NotImplementedException();

//        public IRepository<Sale, int> Sales => throw new NotImplementedException();

//        public IRepository<User, int> Users => throw new NotImplementedException();

//        public IRepository<Warehouse, int> Warehouses => throw new NotImplementedException();

//        public IRepository<WarehouseProduct, CompositeKey> WarehouseProducts => throw new NotImplementedException();

//        public IRepository<ShoppingCart, CompositeKey> ShoppingCarts => throw new NotImplementedException();

//        public void Dispose()
//        {
//            throw new NotImplementedException();
//        }

//        public void Save()
//        {
//            throw new NotImplementedException();
//        }
//    }
//}
