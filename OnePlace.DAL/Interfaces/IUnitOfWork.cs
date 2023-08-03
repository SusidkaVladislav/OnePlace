using OnePlace.DAL.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OnePlace.DAL.Interfaces
{
    public interface IUnitOfWork : IDisposable
    {
        IRepository<Category, int> Categories {  get; }
        IRepository<Color, int> Colors {  get; }
        IRepository<Delivery, int> Deliveries {  get; }
        IRepository<Description, int> Descriptions {  get; }
        IRepository<Gender, int> Genders {  get; }
        IRepository<LikedProduct, CompositeKey> LikedProducts {  get; }
        IRepository<ManufactureCountry, int> ManufactureCountries {  get; }
        IRepository<Manufacturer, int> Manufacturers {  get; }
        IRepository<Material, int> Materials {  get; }
        IRepository<Order, int> Orders {  get; }
        IRepository<OrderProduct, CompositeKey> OrderProducts {  get; }
        IRepository<Picture, int> Pictures {  get; }
        IRepository<Product, int> Products {  get; }
        IRepository<ProductDescription, CompositeKey> ProductDescriptions {  get; }
        IRepository<ProductPicture, CompositeKey> ProductPictures {  get; }
        IRepository<Review, int> Reviews {  get; }
        IRepository<Sale, int> Sales {  get; }
        IRepository<User, int> Users {  get; }
        IRepository<Warehouse, int> Warehouses {  get; }
        IRepository<WarehouseProduct, CompositeKey> WarehouseProducts {  get; }
        IRepository<ShoppingCart, CompositeKey> ShoppingCarts { get; }
        void Save();
    }
}
