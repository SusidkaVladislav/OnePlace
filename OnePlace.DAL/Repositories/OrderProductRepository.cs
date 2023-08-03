using OnePlace.DAL.EF;
using OnePlace.DAL.Entities;
using OnePlace.DAL.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.Entity;

namespace OnePlace.DAL.Repositories
{
    public class OrderProductRepository : IRepository<OrderProduct, CompositeKey>
    {
        private AppDbContext db;
        public OrderProductRepository(AppDbContext context)
        {
            this.db = context;
        }
        public void Create(OrderProduct item)
        {
            db.OrderProducts.Add(item);
        }

        public void Delete(CompositeKey key)
        {
            OrderProduct orderProduct = db.OrderProducts.FirstOrDefault(o => o.OrderId == key.Column1 && o.ProductId == key.Column2);
            if (orderProduct != null)
            {
                db.OrderProducts.Remove(orderProduct);
            }
        }

        public IEnumerable<OrderProduct> Find(Func<OrderProduct, bool> predicate)
        {
            return db.OrderProducts.Where(predicate).ToList();
        }

        public OrderProduct Get(CompositeKey key)
        {
            return db.OrderProducts.FirstOrDefault(o => o.OrderId == key.Column1 && o.ProductId == key.Column2);
        }

        public IEnumerable<OrderProduct> GetAll()
        {
            return db.OrderProducts;
        }

        public void Update(OrderProduct item)
        {
            db.Entry(item).State = (Microsoft.EntityFrameworkCore.EntityState)EntityState.Modified;
        }
    }
}
