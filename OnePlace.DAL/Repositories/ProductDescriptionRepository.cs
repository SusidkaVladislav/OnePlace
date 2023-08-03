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
    public class ProductDescriptionRepository : IRepository<ProductDescription, CompositeKey>
    {
        private AppDbContext db;
        public ProductDescriptionRepository(AppDbContext context)
        {
            this.db = context;
        }
        public void Create(ProductDescription item)
        {
            db.ProductDescriptions.Add(item);
        }

        public void Delete(CompositeKey key)
        {
            ProductDescription productDescription = db.ProductDescriptions.FirstOrDefault(o => o.DescriptionId == key.Column1 && o.ProductId == key.Column2);
            if (productDescription != null)
            {
                db.ProductDescriptions.Remove(productDescription);
            }
        }

        public IEnumerable<ProductDescription> Find(Func<ProductDescription, bool> predicate)
        {
            return db.ProductDescriptions.Include(o => o.Description).Where(predicate).ToList();
        }

        public ProductDescription Get(CompositeKey key)
        {
            return db.ProductDescriptions.Include(o => o.Description).FirstOrDefault(o => o.DescriptionId == key.Column1 && o.ProductId == key.Column2);
        }

        public IEnumerable<ProductDescription> GetAll()
        {
            return db.ProductDescriptions;
        }

        public void Update(ProductDescription item)
        {
            db.Entry(item).State = (Microsoft.EntityFrameworkCore.EntityState)EntityState.Modified;
        }
    }
}
