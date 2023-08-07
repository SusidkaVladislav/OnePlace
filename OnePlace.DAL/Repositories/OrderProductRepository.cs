using OnePlace.DAL.EF;
using OnePlace.DAL.Entities;
using OnePlace.DAL.Interfaces;
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
        public void Create(OrderProduct orderProduct)
        {
            db.OrderProducts.Add(orderProduct);
        }

        public async Task DeleteAsync(CompositeKey key)
        {
            OrderProduct orderProduct = await db.OrderProducts.FirstOrDefaultAsync(o => o.OrderId == key.Column1 
            && o.ProductId == key.Column2);
            if (orderProduct != null)
            {
                db.OrderProducts.Remove(orderProduct);
            }
        }

        public async Task<IEnumerable<OrderProduct>> FindAsync(Func<OrderProduct, bool> predicate)
        {
            return await GetListAsync(predicate);
        }

        private Task<List<OrderProduct>> GetListAsync(Func<OrderProduct, bool> predicate)
        {
            return Task.Run(() => db.OrderProducts.Where(predicate).ToList());
        }

        public async Task<OrderProduct> GetAsync(CompositeKey key)
        {
            return await db.OrderProducts.FirstOrDefaultAsync(o => o.OrderId == key.Column1 && o.ProductId == key.Column2);
        }

        public async Task<IEnumerable<OrderProduct>> GetAllAsync()
        {
            return await db.OrderProducts.ToListAsync();
        }

        public void Update(OrderProduct orderProduct)
        {
            db.Entry(orderProduct).State = (Microsoft.EntityFrameworkCore.EntityState)EntityState.Modified;
        }
    }
}
