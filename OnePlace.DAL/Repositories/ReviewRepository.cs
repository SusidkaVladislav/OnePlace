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
    public class ReviewRepository : IRepository<Review, int>
    {
        private AppDbContext db;
        public ReviewRepository(AppDbContext context)
        {
            this.db = context;
        }
        public void Create(Review item)
        {
            db.Reviews.Add(item);
        }

        public void Delete(int id)
        {
            Review review = db.Reviews.FirstOrDefault(o => o.Id == id);
            if (review != null)
            {
                db.Reviews.Remove(review);
            }
        }

        public IEnumerable<Review> Find(Func<Review, bool> predicate)
        {
            return db.Reviews.Include(o => o.User).Where(predicate).ToList();
        }

        public Review Get(int id)
        {
            return db.Reviews.Include(o => o.User).FirstOrDefault(o => o.Id == id);
        }

        public IEnumerable<Review> GetAll()
        {
            return db.Reviews.Include(o => o.User);
        }

        public void Update(Review item)
        {
            db.Entry(item).State = (Microsoft.EntityFrameworkCore.EntityState)EntityState.Modified;
        }
    }
}
