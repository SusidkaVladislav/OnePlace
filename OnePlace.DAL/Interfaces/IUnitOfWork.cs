using OnePlace.DAL.Entities;

namespace OnePlace.DAL.Interfaces
{
    public interface IUnitOfWork : IDisposable
    {
        IRepository<Category, int> Categories {  get; }
        IRepository<Color, int> Colors {  get; }
        IRepository<Description, int> Descriptions {  get; }
        IRepository<LikedProduct, CompositeKey> LikedProducts {  get; }
        IRepository<ManufactureCountry, int> ManufactureCountries {  get; }
        IRepository<Manufacturer, int> Manufacturers {  get; }
        IRepository<Order, int> Orders {  get; }
        IRepository<OrderProduct, CompositeKey> OrderProducts {  get; }
        IRepository<Product, int> Products {  get; }
        IRepository<ProductDescription, CompositeKey> ProductDescriptions {  get; }
        IRepository<ProductColor, CompositeKey> ProductColors { get; }
        IRepository<ProductPicture, CompositeKey> ProductPictures {  get; }
        IRepository<Picture, int> Pictures { get; }
        IRepository<Review, int> Reviews {  get; }
        IRepository<Sale, int> Sales {  get; }
        IRepository<User, int> Users {  get; }
        IRepository<ShoppingCart, CompositeKey> ShoppingCarts { get; }
        IRepository<Message, int> Messages { get; }
        Task SaveAsync();
    }
}
