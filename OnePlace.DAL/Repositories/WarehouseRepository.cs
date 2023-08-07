using OnePlace.DAL.EF;
using OnePlace.DAL.Entities;
using OnePlace.DAL.Interfaces;
using System.Data.Entity;

namespace OnePlace.DAL.Repositories
{
    public class WarehouseRepository : IRepository<Warehouse, int>
    {
        private AppDbContext db;
        public WarehouseRepository(AppDbContext context)
        {
            this.db = context;
        }
        public void Create(Warehouse warehouse)
        {
            db.Warehouses.Add(warehouse);
        }

        public async Task DeleteAsync(int id)
        {
            Warehouse warehouse = await db.Warehouses.FirstOrDefaultAsync(o => o.Id == id);
            if (warehouse != null)
            {
                db.Warehouses.Remove(warehouse);
            }
        }

        public async Task<IEnumerable<Warehouse>> FindAsync(Func<Warehouse, bool> predicate)
        {
            return await GetListAsync(predicate);
        }

        private Task<List<Warehouse>> GetListAsync(Func<Warehouse, bool> predicate)
        {
            return Task.Run(() => db.Warehouses.Where(predicate).ToList());
        }

        public async Task<Warehouse> GetAsync(int id)
        {
            return await db.Warehouses.FirstOrDefaultAsync(o => o.Id == id);
        }

        public async Task<IEnumerable<Warehouse>> GetAllAsync()
        {
            return await db.Warehouses.ToListAsync();
        }

        public void Update(Warehouse warehouse)
        {
            db.Entry(warehouse).State = (Microsoft.EntityFrameworkCore.EntityState)EntityState.Modified;
        }
    }
}
