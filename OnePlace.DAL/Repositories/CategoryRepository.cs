using OnePlace.DAL.EF;
using OnePlace.DAL.Entities;
using OnePlace.DAL.Interfaces;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;

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
            Category category = db.Categories.FirstOrDefault(o => o.Id == id);
            if(category != null)
            {
                db.Categories.Remove(category);
            }
        }

        public IEnumerable<Category> Find(Func<Category, bool> predicate)
        {
            return db.Categories
                .Include(o=>o.Descriptions)
                .Include(o=>o.Products)
                .Include(o => o.ChildCategories)
                .Where(predicate).ToList();
        }

        public Category Get(int id)
        {
            return db.Categories
                .Include(o => o.Descriptions)
                .Include(o => o.Products)
                .Include(o => o.ChildCategories)
                .FirstOrDefault(o => o.Id == id);
        }

        public IEnumerable<Category> GetAll()
        {
            return db.Categories;
        }

        public void Update(Category item)
        {
            db.Entry(item).State = (Microsoft.EntityFrameworkCore.EntityState)EntityState.Modified;
        }
    }
}
