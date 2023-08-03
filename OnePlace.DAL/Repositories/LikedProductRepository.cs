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
    public class LikedProductRepository : IRepository<LikedProduct, CompositeKey>
    {
        private AppDbContext db;
        public LikedProductRepository(AppDbContext context)
        {
            this.db = context;
        }
        public void Create(LikedProduct item)
        {
            db.LikedProducts.Add(item);
        }

        public void Delete(CompositeKey key)
        {
            LikedProduct likedProduct = db.LikedProducts.FirstOrDefault(o => o.UserId == key.Column1 && o.ProductId == key.Column2);
            if (likedProduct != null)
            {
                db.LikedProducts.Remove(likedProduct);
            }
        }

        public IEnumerable<LikedProduct> Find(Func<LikedProduct, bool> predicate)
        {
            return db.LikedProducts.Include(o => o.User).Include(o=>o.Product).Where(predicate).ToList();
        }

        public LikedProduct Get(CompositeKey key)
        {
            return db.LikedProducts.Include(o => o.User).Include(o => o.Product).FirstOrDefault(o => o.UserId == key.Column1 && o.ProductId == key.Column2);
        }

        public IEnumerable<LikedProduct> GetAll()
        {
            return db.LikedProducts;
        }

        public void Update(LikedProduct item)
        {
            db.Entry(item).State = (Microsoft.EntityFrameworkCore.EntityState)EntityState.Modified;
        }
    }
}
