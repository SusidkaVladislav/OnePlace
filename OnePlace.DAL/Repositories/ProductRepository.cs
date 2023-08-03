using OnePlace.DAL.EF;
using OnePlace.DAL.Entities;
using OnePlace.DAL.Interfaces;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OnePlace.DAL.Repositories
{
    public class ProductRepository : IRepository<Product, int>
    {
        private AppDbContext db;
        public ProductRepository(AppDbContext context)
        {
            this.db = context;
        }
        public void Create(Product item)
        {
            db.Products.Add(item);
        }

        public void Delete(int id)
        {
            Product product = db.Products.FirstOrDefault(o => o.Id == id);
            if (product != null)
            {
                db.Products.Remove(product);
            }
        }

        public IEnumerable<Product> Find(Func<Product, bool> predicate)
        {
            return db.Products
                .Include(o => o.ManufactureCountry)
                .Include(o => o.Manufacturer)
                .Include(o => o.Material)
                .Include(o => o.Color)
                .Include(o => o.Gender)
                .Include(o => o.Category)
                .Include(o => o.Reviews)
                .Include(o => o.ProductDescriptions)
                .Include(o => o.ProductPictures)
                .Where(predicate).ToList();
        }

        public Product Get(int id)
        {
            return db.Products
                .Include(o => o.ManufactureCountry)
                .Include(o => o.Manufacturer)
                .Include(o => o.Material)
                .Include(o => o.Color)
                .Include(o => o.Gender)
                .Include(o => o.Category)
                .Include(o => o.Reviews)
                .Include(o => o.ProductDescriptions)
                .Include(o => o.ProductPictures)
                .FirstOrDefault(o => o.Id == id);
        }

        public IEnumerable<Product> GetAll()
        {
            return db.Products.Include(o => o.ProductPictures);
        }

        public void Update(Product item)
        {
            db.Entry(item).State = (Microsoft.EntityFrameworkCore.EntityState)EntityState.Modified;
        }
    }
}
