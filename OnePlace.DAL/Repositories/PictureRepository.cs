using OnePlace.DAL.EF;
using OnePlace.DAL.Entities;
using OnePlace.DAL.Interfaces;
//using System.Data.Entity;
using Microsoft.EntityFrameworkCore;
namespace OnePlace.DAL.Repositories
{
    public class PictureRepository : IRepository<Picture, int>
    {
        private AppDbContext db;
        public PictureRepository(AppDbContext context)
        {
            this.db = context;
        }
        public void Create(Picture picture)
        {
            db.Pictures.Add(picture);
        }

        public async Task DeleteAsync(int id)
        {
            Picture picture = await db.Pictures.FirstOrDefaultAsync(o => o.Id == id);
            if (picture != null)
            {
                db.Pictures.Remove(picture);
            }
        }

        public async Task<IEnumerable<Picture>> FindAsync(Func<Picture, bool> predicate)
        {
            return await GetListAsync(predicate);
        }

        private Task<List<Picture>> GetListAsync(Func<Picture, bool> predicate)
        {
            return Task.Run(() => db.Pictures.Where(predicate).ToList());
        }

        public async Task<Picture> GetAsync(int id)
        {
            return await db.Pictures.FirstOrDefaultAsync(o => o.Id == id);
        }

        public async Task<IEnumerable<Picture>> GetAllAsync()
        {
            return await db.Pictures.ToListAsync();
        }

        public void Update(Picture picture)
        {
            db.Entry(picture).State = (Microsoft.EntityFrameworkCore.EntityState)EntityState.Modified;
        }
    }
}
