using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using OnePlace.DAL.EF;
using OnePlace.DAL.Entities;

namespace OnePlace.DAL.Repositories
{
    public class ProductColorRepository : RepositoryBase<ProductColor, Composite2Key>
    {
        public ProductColorRepository(AppDbContext context, 
            UserManager<User> userManager) : base(context, userManager) { }

        public override async Task DeleteAsync(Composite2Key key)
        {
            ProductColor productColor = await db.ProductColors
                .FirstOrDefaultAsync(o => o.ProductId == key.Column1 && o.ColorId == key.Column2);
            if (productColor != null)
            {
                db.ProductColors.Remove(productColor);
            }
        }

        public override async Task<IEnumerable<ProductColor>> FindAsync(Func<ProductColor, bool> predicate)
        {
            return await GetListAsync(predicate);
        }

        private Task<List<ProductColor>> GetListAsync(Func<ProductColor, bool> predicate)
        {
            return Task.Run(() => db.ProductColors.Include(o => o.Color).Where(predicate).ToList());
        }

        public override async Task<ProductColor> GetAsync(Composite2Key key)
        {
            return await db.ProductColors
                .Include(o => o.Product)
                .Include(o => o.Color)
                .FirstOrDefaultAsync(o => o.ProductId == key.Column1 && o.ColorId == key.Column2);
        }
    }
}
