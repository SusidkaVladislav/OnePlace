using OnePlace.DAL.EF;
using OnePlace.DAL.Entities;
using OnePlace.DAL.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace OnePlace.DAL.Repositories
{
    public class WarehouseProductRepository : RepositoryBase<WarehouseProduct, CompositeKey>
    {
        public WarehouseProductRepository(AppDbContext context): base(context) { }


        public override async Task DeleteAsync(CompositeKey key)
        {
            WarehouseProduct warehouseProduct = await db.WarehouseProducts
                .FirstOrDefaultAsync(o => o.WarehouseId == key.Column1 && o.ProductId == key.Column2);
            if (warehouseProduct != null)
            {
                db.WarehouseProducts.Remove(warehouseProduct);
            }
        }

        public override async Task<IEnumerable<WarehouseProduct>> FindAsync(Func<WarehouseProduct, bool> predicate)
        {
            return await GetListAsync(predicate);
        }

        private Task<List<WarehouseProduct>> GetListAsync(Func<WarehouseProduct, bool> predicate)
        {
            return Task.Run(() => db.WarehouseProducts.Include(o => o.Warehouse).Where(predicate).ToList());
        }

        public override async Task<WarehouseProduct> GetAsync(CompositeKey key)
        {
            return await db.WarehouseProducts.
                Include(o => o.Warehouse).
                FirstOrDefaultAsync(o => o.WarehouseId == key.Column1 && o.ProductId == key.Column2);
        }
    }
}
