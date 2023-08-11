using Microsoft.EntityFrameworkCore;
using OnePlace.DAL.EF;
using OnePlace.DAL.Entities;

namespace OnePlace.DAL.Repositories
{
    public class ManufacturerRepository : RepositoryBase<Manufacturer, int>
    {

        public ManufacturerRepository(AppDbContext context): base(context) { }


        public override async Task DeleteAsync(int id)
        {
            Manufacturer manufacturer = await db.Manufacturers.FirstOrDefaultAsync(o => o.Id == id);
            if (manufacturer != null)
            {
                db.Manufacturers.Remove(manufacturer);
            }
        }

        public override async Task<IEnumerable<Manufacturer>> FindAsync(Func<Manufacturer, bool> predicate)
        {
            return await GetListAsync(predicate);
        }

        private Task<List<Manufacturer>> GetListAsync(Func<Manufacturer, bool> predicate)
        {
            return Task.Run(() => db.Manufacturers.Include(o => o.Products).Where(predicate).ToList());
        }

        public override async Task<Manufacturer> GetAsync(int id)
        {
            return await db.Manufacturers.Include(o => o.Products).FirstOrDefaultAsync(o => o.Id == id);
        }
    }
}
