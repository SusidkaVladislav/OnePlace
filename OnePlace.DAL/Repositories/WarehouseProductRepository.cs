using OnePlace.DAL.EF;
using OnePlace.DAL.Entities;
using OnePlace.DAL.Interfaces;
using System.Data.Entity;

namespace OnePlace.DAL.Repositories
{
    public class WarehouseProductRepository : IRepository<WarehouseProduct, CompositeKey>
    {
        private AppDbContext db;
        public WarehouseProductRepository(AppDbContext context)
        {
            this.db = context;
        }
        public void Create(WarehouseProduct warehouseProduct)
        {
            db.WarehouseProducts.Add(warehouseProduct);
        }

        public async Task DeleteAsync(CompositeKey key)
        {
            WarehouseProduct warehouseProduct = await db.WarehouseProducts
                .FirstOrDefaultAsync(o => o.WarehouseId == key.Column1 && o.ProductId == key.Column2);
            if (warehouseProduct != null)
            {
                db.WarehouseProducts.Remove(warehouseProduct);
            }
        }

        public async Task<IEnumerable<WarehouseProduct>> FindAsync(Func<WarehouseProduct, bool> predicate)
        {
            return await GetListAsync(predicate);
        }

        private Task<List<WarehouseProduct>> GetListAsync(Func<WarehouseProduct, bool> predicate)
        {
            return Task.Run(() => db.WarehouseProducts.Include(o => o.Warehouse).Where(predicate).ToList());
        }

        public async Task<WarehouseProduct> GetAsync(CompositeKey key)
        {
            return await db.WarehouseProducts.
                Include(o => o.Warehouse).
                FirstOrDefaultAsync(o => o.WarehouseId == key.Column1 && o.ProductId == key.Column2);
        }

        public async Task<IEnumerable<WarehouseProduct>> GetAllAsync()
        {
            return await db.WarehouseProducts.ToListAsync();
        }

        public void Update(WarehouseProduct warehouseProduct)
        {
            db.Entry(warehouseProduct).State = (Microsoft.EntityFrameworkCore.EntityState)EntityState.Modified;
        }
    }
}
