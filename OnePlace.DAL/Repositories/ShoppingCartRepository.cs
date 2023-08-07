using OnePlace.DAL.EF;
using OnePlace.DAL.Entities;
using OnePlace.DAL.Interfaces;
using System.Data.Entity;

namespace OnePlace.DAL.Repositories
{
    public class ShoppingCartRepository : IRepository<ShoppingCart, CompositeKey>
    {
        private AppDbContext db;
        public ShoppingCartRepository(AppDbContext context)
        {
            this.db = context;
        }
        public void Create(ShoppingCart cart)
        {
            db.ShoppingCarts.Add(cart);
        }

        public async Task DeleteAsync(CompositeKey key)
        {
            ShoppingCart shoppingCart = await db.ShoppingCarts
                .FirstOrDefaultAsync(o => o.ProductId == key.Column1 && o.UserId == key.Column2);
            if (shoppingCart != null)
            {
                db.ShoppingCarts.Remove(shoppingCart);
            }
        }

        public async Task<IEnumerable<ShoppingCart>> FindAsync(Func<ShoppingCart, bool> predicate)
        {
            return await GetListAsync(predicate);
        }

        private Task<List<ShoppingCart>> GetListAsync(Func<ShoppingCart, bool> predicate)
        {
            return Task.Run(() => db.ShoppingCarts.Include(o => o.Product).Where(predicate).ToList());
        }

        public async Task<ShoppingCart> GetAsync(CompositeKey key)
        {
            return await db.ShoppingCarts
                .Include(o => o.Product)
                .FirstOrDefaultAsync(o => o.ProductId == key.Column1 && o.UserId == key.Column2);
        }

        public async Task<IEnumerable<ShoppingCart>> GetAllAsync()
        {
            return await db.ShoppingCarts.ToListAsync();
        }

        public void Update(ShoppingCart cart)
        {
            db.Entry(cart).State = (Microsoft.EntityFrameworkCore.EntityState)EntityState.Modified;
        }
    }
}
