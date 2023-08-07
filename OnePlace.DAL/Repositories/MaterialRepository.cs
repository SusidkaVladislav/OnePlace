using OnePlace.DAL.EF;
using OnePlace.DAL.Entities;
using OnePlace.DAL.Interfaces;
using System.Data.Entity;

namespace OnePlace.DAL.Repositories
{
    public class MaterialRepository : IRepository<Material, int>
    {
        private AppDbContext db;
        public MaterialRepository(AppDbContext context)
        {
            this.db = context;
        }
        public void Create(Material material)
        {
            db.Materials.Add(material);
        }

        public async Task DeleteAsync(int id)
        {
            Material material = await db.Materials.FirstOrDefaultAsync(o => o.Id == id);
            if (material != null)
            {
                db.Materials.Remove(material);
            }
        }

        public async Task<IEnumerable<Material>> FindAsync(Func<Material, bool> predicate)
        {
            return await GetListAsync(predicate);
        }

        private Task<List<Material>> GetListAsync(Func<Material, bool> predicate)
        {
            return Task.Run(() => db.Materials.Include(o => o.Products).Where(predicate).ToList());
        }

        public async Task<Material> GetAsync(int id)
        {
            return await db.Materials.Include(o => o.Products).FirstOrDefaultAsync(o => o.Id == id);
        }

        public async Task<IEnumerable<Material>> GetAllAsync()
        {
            return await db.Materials.ToListAsync();
        }

        public void Update(Material material)
        {
            db.Entry(material).State = (Microsoft.EntityFrameworkCore.EntityState)EntityState.Modified;
        }
    }
}
