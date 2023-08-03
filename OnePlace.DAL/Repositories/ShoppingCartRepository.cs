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
    public class ShoppingCartRepository : IRepository<ShoppingCart, CompositeKey>
    {
        private AppDbContext db;
        public ShoppingCartRepository(AppDbContext context)
        {
            this.db = context;
        }
        public void Create(ShoppingCart item)
        {
            db.ShoppingCarts.Add(item);
        }

        public void Delete(CompositeKey key)
        {
            ShoppingCart shoppingCart = db.ShoppingCarts.FirstOrDefault(o => o.ProductId == key.Column1 && o.UserId == key.Column2);
            if (shoppingCart != null)
            {
                db.ShoppingCarts.Remove(shoppingCart);
            }
        }

        public IEnumerable<ShoppingCart> Find(Func<ShoppingCart, bool> predicate)
        {
            return db.ShoppingCarts.Include(o => o.Product).Where(predicate).ToList();
        }

        public ShoppingCart Get(CompositeKey key)
        {
            return db.ShoppingCarts.Include(o => o.Product).FirstOrDefault(o => o.ProductId == key.Column1 && o.UserId == key.Column2);
        }

        public IEnumerable<ShoppingCart> GetAll()
        {
            return db.ShoppingCarts;
        }

        public void Update(ShoppingCart item)
        {
            db.Entry(item).State = (Microsoft.EntityFrameworkCore.EntityState)EntityState.Modified;
        }
    }
}
