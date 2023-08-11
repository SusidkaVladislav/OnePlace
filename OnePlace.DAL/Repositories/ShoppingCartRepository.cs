using OnePlace.DAL.EF;
using OnePlace.DAL.Entities;
using OnePlace.DAL.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace OnePlace.DAL.Repositories
{
    public class ShoppingCartRepository : RepositoryBase<ShoppingCart, CompositeKey>
    {
        public ShoppingCartRepository(AppDbContext context): base(context) { }  


        public override async Task DeleteAsync(CompositeKey key)
        {
            ShoppingCart shoppingCart = await db.ShoppingCarts
                .FirstOrDefaultAsync(o => o.ProductId == key.Column1 && o.UserId == key.Column2);
            if (shoppingCart != null)
            {
                db.ShoppingCarts.Remove(shoppingCart);
            }
        }

        public override async Task<IEnumerable<ShoppingCart>> FindAsync(Func<ShoppingCart, bool> predicate)
        {
            return await GetListAsync(predicate);
        }

        private Task<List<ShoppingCart>> GetListAsync(Func<ShoppingCart, bool> predicate)
        {
            return Task.Run(() => db.ShoppingCarts.Include(o => o.Product).Where(predicate).ToList());
        }

        public override async Task<ShoppingCart> GetAsync(CompositeKey key)
        {
            return await db.ShoppingCarts
                .Include(o => o.Product)
                .FirstOrDefaultAsync(o => o.ProductId == key.Column1 && o.UserId == key.Column2);
        }
    }
}
