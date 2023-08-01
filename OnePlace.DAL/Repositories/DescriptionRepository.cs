using OnePlace.DAL.EF;
using OnePlace.DAL.Entities;
using OnePlace.DAL.Interfaces;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OnePlace.DAL.Repositories
{
    public class DescriptionRepository : IRepository<Description>
    {
        private AppDbContext db;
        public DescriptionRepository(AppDbContext context)
        {
            this.db = context;
        }
        public void Create(Description item)
        {
            db.Descriptions.Add(item);
        }

        public void Delete(int id)
        {
            Description description = db.Descriptions.Find(id);
            if (description != null)
            {
                db.Descriptions.Remove(description);
            }
        }

        public IEnumerable<Description> Find(Func<Description, bool> predicate)
        {
            return db.Descriptions.Where(predicate).ToList();
        }

        public Description Get(int id)
        {
            return db.Descriptions.Find(id);
        }

        public async Task<List<Description>> GetAll()
        {
            return await db.Descriptions.ToListAsync();
        }

        public void Update(Description item)
        {
            db.Entry(item).State = (Microsoft.EntityFrameworkCore.EntityState)EntityState.Modified;
        }
    }
}
