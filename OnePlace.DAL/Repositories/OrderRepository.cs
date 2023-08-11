using Microsoft.EntityFrameworkCore;
using OnePlace.DAL.EF;
using OnePlace.DAL.Entities;

namespace OnePlace.DAL.Repositories
{
    public class OrderRepository : RepositoryBase<Order, int>
    {
        public OrderRepository(AppDbContext context): base(context) { }

        

        public override async Task DeleteAsync(int id)
        {
            Order order = await db.Orders.FirstOrDefaultAsync(o => o.Id == id);
            if (order != null)
            {
                db.Orders.Remove(order);
            }
        }

        public override async Task<IEnumerable<Order>> FindAsync(Func<Order, bool> predicate)
        {
            return await GetListAsync(predicate);
        }

        private Task<List<Order>> GetListAsync(Func<Order, bool> predicate)
        {
            return Task.Run(() => db.Orders.Include(o => o.Delivery).Where(predicate).ToList());
        }

        public override async Task<Order> GetAsync(int id)
        {
            return await db.Orders.Include(o => o.Delivery).FirstOrDefaultAsync(o => o.Id == id);
        }
    }
}
