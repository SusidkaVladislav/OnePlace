using OnePlace.DAL.EF;
using OnePlace.DAL.Entities;
using OnePlace.DAL.Interfaces;
using System.Data.Entity;

namespace OnePlace.DAL.Repositories
{
    public class ReviewRepository : IRepository<Review, int>
    {
        private AppDbContext db;
        public ReviewRepository(AppDbContext context)
        {
            this.db = context;
        }
        public void Create(Review review)
        {
            db.Reviews.Add(review);
        }

        public async Task DeleteAsync(int id)
        {
            Review review = await db.Reviews.FirstOrDefaultAsync(o => o.Id == id);
            if (review != null)
            {
                db.Reviews.Remove(review);
            }
        }

        public async Task<IEnumerable<Review>> FindAsync(Func<Review, bool> predicate)
        {
            return await GetListAsync(predicate);
        }

        private Task<List<Review>> GetListAsync(Func<Review, bool> predicate)
        {
            return Task.Run(() => db.Reviews.Include(o => o.User).Where(predicate).ToList());
        }

        public async Task<Review> GetAsync(int id)
        {
            return await db.Reviews
                .Include(o => o.User)
                .FirstOrDefaultAsync(o => o.Id == id);
        }

        public async Task<IEnumerable<Review>> GetAllAsync()
        {
            return await db.Reviews.Include(o => o.User).ToListAsync();
        }

        public void Update(Review review)
        {
            db.Entry(review).State = (Microsoft.EntityFrameworkCore.EntityState)EntityState.Modified;
        }
    }
}
