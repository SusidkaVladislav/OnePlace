using OnePlace.DAL.EF;
using OnePlace.DAL.Entities;
using OnePlace.DAL.Interfaces;
using Microsoft.EntityFrameworkCore;


namespace OnePlace.DAL.Repositories
{
    public class CategoryRepository : IRepository<Category>
    {
        private AppDbContext db;
        public CategoryRepository(AppDbContext context)
        {
            this.db = context;
        }
        public void Create(Category item)
        {
            db.Categories.Add(item);
        }

        public void Delete(int id)
        {
            Category category = db.Categories.Find(id);
            if(category != null)
            {
                db.Categories.Remove(category);
            }
        }

        public IEnumerable<Category> Find(Func<Category, bool> predicate)
        {
            return db.Categories.Where(predicate).ToList();
        }

        public Category Get(int id)
        {
            return db.Categories.Find(id);
        }

        public async Task<List<Category>> GetAll()
        {
            return await db.Categories.ToListAsync();
        }

        public void Update(Category item)
        {
            db.Entry(item).State = (Microsoft.EntityFrameworkCore.EntityState)EntityState.Modified;
        }
    }
}
