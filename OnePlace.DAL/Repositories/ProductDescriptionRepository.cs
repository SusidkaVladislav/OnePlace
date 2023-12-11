using OnePlace.DAL.EF;
using OnePlace.DAL.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;

namespace OnePlace.DAL.Repositories
{
    public class ProductDescriptionRepository : RepositoryBase<ProductDescription, Composite2Key>
    {
        public ProductDescriptionRepository(AppDbContext context,
            UserManager<User> userManager) : base(context, userManager) { }


        public override async Task DeleteAsync(Composite2Key key)
        {
            ProductDescription productDescription = await db.ProductDescriptions.FirstOrDefaultAsync(
                o => o.DescriptionId == key.Column1 && o.ProductId == key.Column2);
            if (productDescription != null)
            {
                db.ProductDescriptions.Remove(productDescription);
            }
        }

        public override async Task<IEnumerable<ProductDescription>> FindAsync(Func<ProductDescription, bool> predicate)
        {
            return await GetListAsync(predicate);
        }

        private Task<List<ProductDescription>> GetListAsync(Func<ProductDescription, bool> predicate)
        {
            return Task.Run(() => db.ProductDescriptions.Include(o => o.Description).Where(predicate).ToList());
        }

        public override async Task<ProductDescription> GetAsync(Composite2Key key)
        {
            return await db.ProductDescriptions
                .Include(o => o.Description)
                .FirstOrDefaultAsync(o => o.DescriptionId == key.Column1 && o.ProductId == key.Column2);
        }
    }
}
