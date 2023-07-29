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
        IRepository<Category> Categories {  get; }
        IRepository<Color> Colors {  get; }
        IRepository<Delivery> Deliveries {  get; }
        IRepository<Description> Descriptions {  get; }
        IRepository<Gender> Genders {  get; }
        IRepository<LikedProduct> LikedProducts {  get; }
        IRepository<ManufactureCountry> ManufactureCountries {  get; }
        IRepository<Manufacturer> Manufacturers {  get; }
        IRepository<Material> Materials {  get; }
        IRepository<Order> Orders {  get; }
        IRepository<OrderProduct> OrderProducts {  get; }
        IRepository<Picture> Pictures {  get; }
        IRepository<Product> Products {  get; }
        IRepository<ProductDescription> ProductDescriptions {  get; }
        IRepository<ProductPicture> ProductPictures {  get; }
        IRepository<Review> Reviews {  get; }
        IRepository<Sale> Sales {  get; }
        IRepository<User> Users {  get; }
        IRepository<Warehouse> Warehouses {  get; }
        IRepository<WarehouseProduct> WarehouseProducts {  get; }
        void Save();
    }
}
