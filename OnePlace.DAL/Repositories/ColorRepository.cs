using OnePlace.DAL.EF;
using OnePlace.DAL.Entities;
using OnePlace.DAL.Interfaces;
using System.Data.Entity;

namespace OnePlace.DAL.Repositories
{
    public class ColorReository : IRepository<Color, int>
    {
        private AppDbContext db;
        public ColorReository(AppDbContext context)
        {
            this.db = context;
        }
        public void Create (Color color)
        {
            db.Colors.Add(color);
        }

        public async Task DeleteAsync(int id)
        {
            Color color = await db.Colors.FirstOrDefaultAsync(o => o.Id == id);
            if (color != null)
            {
                db.Colors.Remove(color);
            }
        }

        public async Task<IEnumerable<Color>> FindAsync(Func<Color, bool> predicate)
        {
            return await GetListAsync(predicate);
        }

        private Task<List<Color>> GetListAsync(Func<Color, bool> predicate)
        {
            return Task.Run(() => db.Colors.Include(o => o.Products).Where(predicate).ToList());
        }

        public async Task<Color> GetAsync(int id)
        {
            return await db.Colors.Include(o => o.Products).FirstOrDefaultAsync(o => o.Id == id);
        }

        public async Task<IEnumerable<Color>> GetAllAsync()
        {
            return await db.Colors.ToListAsync();
        }

        public void Update(Color color)
        {
            db.Entry(color).State = (Microsoft.EntityFrameworkCore.EntityState)EntityState.Modified;
        }
    }
}
