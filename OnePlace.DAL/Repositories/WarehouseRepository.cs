using Microsoft.EntityFrameworkCore;
using OnePlace.DAL.EF;
using OnePlace.DAL.Entities;

namespace OnePlace.DAL.Repositories
{
    public class WarehouseRepository : RepositoryBase<Warehouse, int>
    {
        public WarehouseRepository(AppDbContext context): base(context) { }


        public override async Task DeleteAsync(int id)
        {
            Warehouse warehouse = await db.Warehouses.FirstOrDefaultAsync(o => o.Id == id);
            if (warehouse != null)
            {
                db.Warehouses.Remove(warehouse);
            }
        }

        public override async Task<IEnumerable<Warehouse>> FindAsync(Func<Warehouse, bool> predicate)
        {
            return await GetListAsync(predicate);
        }

        private Task<List<Warehouse>> GetListAsync(Func<Warehouse, bool> predicate)
        {
            return Task.Run(() => db.Warehouses.Where(predicate).ToList());
        }

        public override async Task<Warehouse> GetAsync(int id)
        {
            return await db.Warehouses.FirstOrDefaultAsync(o => o.Id == id);
        }
    }
}
