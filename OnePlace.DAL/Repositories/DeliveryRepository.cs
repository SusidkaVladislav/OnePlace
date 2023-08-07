using OnePlace.DAL.EF;
using OnePlace.DAL.Entities;
using OnePlace.DAL.Interfaces;
using System.Data.Entity;

namespace OnePlace.DAL.Repositories
{
    public class DeliveryRepository : IRepository<Delivery, int>
    {
        private AppDbContext db;
        public DeliveryRepository(AppDbContext context)
        {
            this.db = context;
        }
        public void Create(Delivery delivery)
        {
            db.Deliveries.Add(delivery);
        }

        public async Task DeleteAsync(int id)
        {
            Delivery delivery = await db.Deliveries.FirstOrDefaultAsync(o => o.Id == id);
            if (delivery != null)
            {
                db.Deliveries.Remove(delivery);
            }
        }

        public async Task<IEnumerable<Delivery>> FindAsync(Func<Delivery, bool> predicate)
        {
            return await GetListAsync(predicate);
        }

        private Task<List<Delivery>> GetListAsync(Func<Delivery, bool> predicate)
        {
            return Task.Run(() => db.Deliveries.Include(o => o.Picture).Where(predicate).ToList());
        }

        public async Task<Delivery> GetAsync(int id)
        {
            return await db.Deliveries.Include(o => o.Picture).FirstOrDefaultAsync(o => o.Id == id);
        }

        public async Task<IEnumerable<Delivery>> GetAllAsync()
        {
            return await db.Deliveries.Include(o => o.Picture).ToListAsync();
        }

        public void Update(Delivery delivery)
        {
            db.Entry(delivery).State = (Microsoft.EntityFrameworkCore.EntityState)EntityState.Modified;
        }
    }
}
