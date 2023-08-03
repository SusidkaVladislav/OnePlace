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
    public class GenderRepository : IRepository<Gender, int>
    {
        private AppDbContext db;
        public GenderRepository(AppDbContext context)
        {
            this.db = context;
        }
        public void Create(Gender item)
        {
            db.Genders.Add(item);
        }

        public void Delete(int id)
        {
            Gender gender = db.Genders.FirstOrDefault(o => o.Id == id);
            if (gender != null)
            {
                db.Genders.Remove(gender);
            }
        }

        public IEnumerable<Gender> Find(Func<Gender, bool> predicate)
        {
            return db.Genders.Include(o => o.Products).Where(predicate).ToList();
        }

        public Gender Get(int id)
        {
            return db.Genders.Include(o => o.Products).FirstOrDefault(o => o.Id == id);
        }

        public IEnumerable<Gender> GetAll()
        {
            return db.Genders;
        }

        public void Update(Gender item)
        {
            db.Entry(item).State = (Microsoft.EntityFrameworkCore.EntityState)EntityState.Modified;
        }
    }
}
