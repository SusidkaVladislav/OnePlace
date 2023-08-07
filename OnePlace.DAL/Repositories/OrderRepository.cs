using OnePlace.DAL.EF;
using OnePlace.DAL.Entities;
using OnePlace.DAL.Interfaces;
using System.Data.Entity;

namespace OnePlace.DAL.Repositories
{
    public class OrderRepository : IRepository<Order, int>
    {
        private AppDbContext db;
        public OrderRepository(AppDbContext context)
        {
            this.db = context;
        }
        public void Create(Order order)
        {
            db.Orders.Add(order);
        }

        public async Task DeleteAsync(int id)
        {
            Order order = await db.Orders.FirstOrDefaultAsync(o => o.Id == id);
            if (order != null)
            {
                db.Orders.Remove(order);
            }
        }

        public async Task<IEnumerable<Order>> FindAsync(Func<Order, bool> predicate)
        {
            return await GetListAsync(predicate);
        }

        private Task<List<Order>> GetListAsync(Func<Order, bool> predicate)
        {
            return Task.Run(() => db.Orders.Include(o => o.Delivery).Where(predicate).ToList());
        }

        public async Task<Order> GetAsync(int id)
        {
            return await db.Orders.Include(o => o.Delivery).FirstOrDefaultAsync(o => o.Id == id);
        }

        public async Task<IEnumerable<Order>> GetAllAsync()
        {
            return await db.Orders.ToListAsync();
        }

        public void Update(Order order)
        {
            db.Entry(order).State = (Microsoft.EntityFrameworkCore.EntityState)EntityState.Modified;
        }
    }
}
