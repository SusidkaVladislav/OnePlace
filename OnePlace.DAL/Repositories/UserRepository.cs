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
    public class UserRepository : IRepository<User, int>
    {
        private AppDbContext db;
        public UserRepository(AppDbContext context)
        {
            this.db = context;
        }
        public void Create(User item)
        {
            db.Users.Add(item);
        }

        public void Delete(int id)
        {
            User user = db.Users.FirstOrDefault(o => Convert.ToInt32(o.Id) == id);
            if (user != null)
            {
                db.Users.Remove(user);
            }
        }

        public IEnumerable<User> Find(Func<User, bool> predicate)
        {
            return db.Users
                .Include(o => o.Orders)
                .Include(o => o.Reviews)
                .Include(o => o.LikedProducts)
                .Include(o => o.ShoppingCarts)
                .Where(predicate).ToList();
        }

        public User Get(int id)
        {
            return db.Users
                .Include(o => o.Orders)
                .Include(o => o.Reviews)
                .Include(o => o.LikedProducts)
                .Include(o => o.ShoppingCarts)
                .FirstOrDefault(o => Convert.ToInt32(o.Id) == id);
        }

        public IEnumerable<User> GetAll()
        {
            return db.Users;
        }

        public void Update(User item)
        {
            db.Entry(item).State = (Microsoft.EntityFrameworkCore.EntityState)EntityState.Modified;
        }
    }
}
