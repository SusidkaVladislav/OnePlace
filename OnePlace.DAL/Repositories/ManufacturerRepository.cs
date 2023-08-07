using OnePlace.DAL.EF;
using OnePlace.DAL.Entities;
using OnePlace.DAL.Interfaces;
using System.Data.Entity;

namespace OnePlace.DAL.Repositories
{
    public class ManufacturerRepository : IRepository<Manufacturer, int>
    {
        private AppDbContext db;
        public ManufacturerRepository(AppDbContext context)
        {
            this.db = context;
        }
        public void Create(Manufacturer manufacturer)
        {
            db.Manufacturers.Add(manufacturer);
        }

        public async Task DeleteAsync(int id)
        {
            Manufacturer manufacturer = await db.Manufacturers.FirstOrDefaultAsync(o => o.Id == id);
            if (manufacturer != null)
            {
                db.Manufacturers.Remove(manufacturer);
            }
        }

        public async Task<IEnumerable<Manufacturer>> FindAsync(Func<Manufacturer, bool> predicate)
        {
            return await GetListAsync(predicate);
        }

        private Task<List<Manufacturer>> GetListAsync(Func<Manufacturer, bool> predicate)
        {
            return Task.Run(() => db.Manufacturers.Include(o => o.Products).Where(predicate).ToList());
        }

        public async Task<Manufacturer> GetAsync(int id)
        {
            return await db.Manufacturers.Include(o => o.Products).FirstOrDefaultAsync(o => o.Id == id);
        }

        public async Task<IEnumerable<Manufacturer>> GetAllAsync()
        {
            return await db.Manufacturers.ToListAsync();
        }

        public void Update(Manufacturer manufacturer)
        { 
            db.Entry(manufacturer).State = (Microsoft.EntityFrameworkCore.EntityState)EntityState.Modified;
        }
    }
}
