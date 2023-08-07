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
        public void Create(User user)
        {
            db.Users.Add(user);
        }

        public async Task DeleteAsync(int id)
        {
            User user = await db.Users
                .FirstOrDefaultAsync(o => Convert.ToInt32(o.Id) == id);
            if (user != null)
            {
                db.Users.Remove(user);
            }
        }

        public async Task<IEnumerable<User>> FindAsync(Func<User, bool> predicate)
        {
            return await GetListAsync(predicate);
        }

        private Task<List<User>> GetListAsync(Func<User, bool> predicate)
        {
            return Task.Run(() => db.Users
                .Include(o => o.Orders)
                .Include(o => o.Reviews)
                .Include(o => o.LikedProducts)
                .Include(o => o.ShoppingCarts)
                .Where(predicate).ToList());
        }

        public async Task<User> GetAsync(int id)
        {
            return await db.Users
                .Include(o => o.Orders)
                .Include(o => o.Reviews)
                .Include(o => o.LikedProducts)
                .Include(o => o.ShoppingCarts)
                .FirstOrDefaultAsync(o => Convert.ToInt32(o.Id) == id);
        }

        public async Task<IEnumerable<User>> GetAllAsync()
        {
            return await db.Users.ToListAsync();
        }

        public void Update(User user)
        {
            db.Entry(user).State = (Microsoft.EntityFrameworkCore.EntityState)EntityState.Modified;
        }
    }
}
