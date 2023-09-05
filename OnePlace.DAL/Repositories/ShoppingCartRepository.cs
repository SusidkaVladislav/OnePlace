using OnePlace.DAL.EF;
using OnePlace.DAL.Entities;
using OnePlace.DAL.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;

namespace OnePlace.DAL.Repositories
{
    public class ShoppingCartRepository : RepositoryBase<ShoppingCart, Composite3Key>
    {
        public ShoppingCartRepository(AppDbContext context, 
            UserManager<User> userManager) : base(context, userManager) { }  


        public override async Task DeleteAsync(Composite3Key key)
        {
            ShoppingCart shoppingCart = await db.ShoppingCarts
                .FirstOrDefaultAsync(
                o => o.ProductId == key.Column1 && o.UserId == key.Column2 && o.ColorId == key.Column3);
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

        public override async Task<ShoppingCart> GetAsync(Composite3Key key)
        {
            return await db.ShoppingCarts
                .Include(o => o.Product)
                .FirstOrDefaultAsync(o => o.ProductId == key.Column1 && o.UserId == key.Column2 && o.ColorId == key.Column3);
        }
    }
}
