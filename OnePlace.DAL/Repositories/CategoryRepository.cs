using Microsoft.EntityFrameworkCore;
using OnePlace.DAL.EF;
using OnePlace.DAL.Entities;


namespace OnePlace.DAL.Repositories
{
    public class CategoryRepository : RepositoryBase<Category, int>
    {
        public CategoryRepository(AppDbContext context) : base(context) { }

        public override async Task DeleteAsync(int id)
        {
            Category category = await db.Categories.FirstOrDefaultAsync(o => o.Id == id);
            if (category != null)
            {
                db.Categories.Remove(category);
            }
        }

        public override async Task<IEnumerable<Category>> FindAsync(Func<Category, bool> predicate)
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

        public override async Task<Category> GetAsync(int id)
        {
            return await db.Categories
                .Include(o => o.Descriptions)
                .Include(o => o.Products)
                .Include(o => o.ChildCategories)
                .FirstOrDefaultAsync(o => o.Id == id);
        }
    }
}
