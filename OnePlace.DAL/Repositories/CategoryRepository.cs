using LinqKit;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using OnePlace.DAL.EF;
using OnePlace.DAL.Entities;


namespace OnePlace.DAL.Repositories
{
    public class CategoryRepository : RepositoryBase<Category, int>
    {
        public CategoryRepository(AppDbContext context, UserManager<User> userManager) : base(context, userManager) { }

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
                .Include(o => o.Picture)
                .Include(o => o.ChildCategories)
                .Where(predicate).ToList());
        }

        public override async Task<Category> GetAsync(int id)
        {
            var category = await db.Categories
            .Include(o => o.Descriptions)
            .Include(o => o.Products)
            .Include(o => o.Picture)
            .Include(o => o.ChildCategories)
            .FirstOrDefaultAsync(o => o.Id == id);

            //Підтягнути фотографії всіх підкатегорій
            if (category != null)
            {
                category.ChildCategories
                .ForEach(async o =>
                    o.Picture = FindAsync(c => c.Id == o.Id)
                    .Result.Select(c => c.Picture).FirstOrDefault()
                );

                category.ChildCategories
                .ForEach(async o =>
                    o.Products = FindAsync(c => c.Id == o.Id)
                    .Result.Select(c => c.Products).FirstOrDefault()
                );
            }
                

            return category;
        }
    }
}
