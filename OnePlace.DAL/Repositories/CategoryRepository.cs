using OnePlace.DAL.EF;
using OnePlace.DAL.Entities;
using OnePlace.DAL.Interfaces;
using Microsoft.EntityFrameworkCore;


namespace OnePlace.DAL.Repositories
{
    public class CategoryRepository : IRepository<Category, int>
    {
        private AppDbContext db;
        public CategoryRepository(AppDbContext context)
        {
            this.db = context;
        }

        public void Create(Category category)
        {
            db.Categories.Add(category);
        }

        public async Task DeleteAsync(int id)
        {
            Category category = await db.Categories.FirstOrDefaultAsync(o => o.Id == id);
            if (category != null)
            {
                db.Categories.Remove(category);
            }
        }

        public async Task<IEnumerable<Category>> FindAsync(Func<Category, bool> predicate)
        {
            return await GetListAsync(predicate);
        }

        private Task<List<Category>> GetListAsync(Func<Category, bool> predicate)
        {
            return Task.Run(() => db.Categories
                .Include(o => o.Descriptions)
                .Include(o => o.Products)
                .Include(o => o.ChildCategories)
                .Where(predicate).ToList());
        }

        public async Task<Category> GetAsync(int id)
        {
            return await db.Categories
                .Include(o => o.Descriptions)
                .Include(o => o.Products)
                .Include(o => o.ChildCategories)
                .FirstOrDefaultAsync(o => o.Id == id);
        }

        public void Update(Category category)
        {
            db.Entry(category).State = (EntityState)EntityState.Modified;
        }

        public async Task<IEnumerable<Category>> GetAllAsync()
        {
            return await db.Categories.ToListAsync();
        }
    }
}
