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
    public class OrderRepository : IRepository<Order, int>
    {
        private AppDbContext db;
        public OrderRepository(AppDbContext context)
        {
            this.db = context;
        }
        public void Create(Order item)
        {
            db.Orders.Add(item);
        }

        public void Delete(int id)
        {
            Order order = db.Orders.FirstOrDefault(o => o.Id == id);
            if (order != null)
            {
                db.Orders.Remove(order);
            }
        }

        public IEnumerable<Order> Find(Func<Order, bool> predicate)
        {
            return db.Orders.Include(o => o.Delivery).Where(predicate).ToList();
        }

        public Order Get(int id)
        {
            return db.Orders.Include(o => o.Delivery).FirstOrDefault(o => o.Id == id);
        }

        public IEnumerable<Order> GetAll()
        {
            return db.Orders;
        }

        public void Update(Order item)
        {
            db.Entry(item).State = (Microsoft.EntityFrameworkCore.EntityState)EntityState.Modified;
        }
    }
}
