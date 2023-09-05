using OnePlace.DAL.Entities;

namespace OnePlace.DAL.Interfaces
{
    public interface IUnitOfWork : IDisposable
    {
        IRepository<Category, int> Categories {  get; }
        IRepository<Color, int> Colors {  get; }
        IRepository<Description, int> Descriptions {  get; }
        IRepository<LikedProduct, Composite2Key> LikedProducts {  get; }
        IRepository<ManufactureCountry, int> ManufactureCountries {  get; }
        IRepository<Manufacturer, int> Manufacturers {  get; }
        IRepository<Order, int> Orders {  get; }
        IRepository<OrderProduct, Composite3Key> OrderProducts {  get; }
        IRepository<Product, int> Products {  get; }
        IRepository<ProductDescription, Composite2Key> ProductDescriptions {  get; }
        IRepository<ProductColor, Composite2Key> ProductColors { get; }
        IRepository<ProductPicture, Composite2Key> ProductPictures {  get; }
        IRepository<Picture, int> Pictures { get; }
        IRepository<Review, int> Reviews {  get; }
        IRepository<Sale, int> Sales {  get; }
        IRepository<User, int> Users {  get; }
        IRepository<ShoppingCart, Composite3Key> ShoppingCarts { get; }
        IRepository<Message, int> Messages { get; }
        IRepository<ReviewReply, int> ReviewReplies { get; }
        IRepository<CreditCard, int> CreditCards { get; }

        Task SaveAsync();
    }
}
