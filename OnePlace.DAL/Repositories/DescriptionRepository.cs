using OnePlace.DAL.EF;
using OnePlace.DAL.Entities;
using OnePlace.DAL.Interfaces;
//using System.Data.Entity;
using Microsoft.EntityFrameworkCore;
namespace OnePlace.DAL.Repositories
{
    public class DescriptionRepository : IRepository<Description, int>
    {
        private AppDbContext db;
        public DescriptionRepository(AppDbContext context)
        {
            this.db = context;
        }
        public void Create(Description description)
        {
            db.Descriptions.Add(description);
        }

        public async Task DeleteAsync(int id)
        {
            Description description = await db.Descriptions.FirstOrDefaultAsync(o => o.Id == id);
            if (description != null)
            {
                db.Descriptions.Remove(description);
            }
        }

        public async Task<IEnumerable<Description>> FindAsync(Func<Description, bool> predicate)
        {
            return await GetListAsync(predicate);
        }

        private Task<List<Description>> GetListAsync(Func<Description, bool> predicate)
        {
            return Task.Run(() => db.Descriptions.Where(predicate).ToList());
        }

        public async Task<Description> GetAsync(int id)
        {
            return await db.Descriptions.FirstOrDefaultAsync(o => o.Id == id);
        }

        public async Task<IEnumerable<Description>> GetAllAsync()
        {
            return await db.Descriptions.ToListAsync();
        }

        public void Update(Description description)
        {
            db.Entry(description).State = (Microsoft.EntityFrameworkCore.EntityState)EntityState.Modified;
        }
    }
}
