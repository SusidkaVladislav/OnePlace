using OnePlace.DAL.EF;
using OnePlace.DAL.Entities;
using OnePlace.DAL.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;

namespace OnePlace.DAL.Repositories
{
    public class UserRepository : RepositoryBase<User, int>
    {
        public UserRepository(AppDbContext context, 
            UserManager<User> userManager) : base(context, userManager) { }


        public override async Task DeleteAsync(int id)
        {
            User user = await db.Users
                .FirstOrDefaultAsync(o => Convert.ToInt32(o.Id) == id);
            if (user != null)
            {
                db.Users.Remove(user);
            }
        }

        public override async Task<IEnumerable<User>> FindAsync(Func<User, bool> predicate)
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

        public override async Task<User> GetAsync(int id)
        {
            return await db.Users
                .Include(o => o.Orders)
                .Include(o => o.Reviews)
                .Include(o => o.LikedProducts)
                .Include(o => o.ShoppingCarts)
                .FirstOrDefaultAsync(o => Convert.ToInt32(o.Id) == id);
        }
    }
}
