using OnePlace.DAL.EF;
using OnePlace.DAL.Entities;
using OnePlace.DAL.Interfaces;
using System.Data.Entity;

namespace OnePlace.DAL.Repositories
{
    public class GenderRepository : IRepository<Gender, int>
    {
        private AppDbContext db;
        public GenderRepository(AppDbContext context)
        {
            this.db = context;
        }
        public void Create(Gender gender)
        {
            db.Genders.Add(gender);
        }

        public async Task DeleteAsync(int id)
        {
            Gender gender = await db.Genders.FirstOrDefaultAsync(o => o.Id == id);
            if (gender != null)
            {
                db.Genders.Remove(gender);
            }
        }

        public async Task<IEnumerable<Gender>> FindAsync(Func<Gender, bool> predicate)
        {
            return await GetListAsync(predicate);
        }

        private Task<List<Gender>> GetListAsync(Func<Gender, bool> predicate)
        {
            return Task.Run(() => db.Genders.Include(o => o.Products).Where(predicate).ToList());
        }

        public async Task<Gender> GetAsync(int id)
        {
            return await db.Genders.Include(o => o.Products).FirstOrDefaultAsync(o => o.Id == id);
        }

        public async Task<IEnumerable<Gender>> GetAllAsync()
        {
            return await db.Genders.ToListAsync();
        }

        public void Update(Gender gender)
        {
            db.Entry(gender).State = (Microsoft.EntityFrameworkCore.EntityState)EntityState.Modified;
        }
    }
}
