using Microsoft.EntityFrameworkCore;
using OnePlace.DAL.EF;
using OnePlace.DAL.Entities;

namespace OnePlace.DAL.Repositories
{
    public class LikedProductRepository : RepositoryBase<LikedProduct, CompositeKey>
    {
        
        public LikedProductRepository(AppDbContext context): base(context) { }

        public override async Task DeleteAsync(CompositeKey key)
        {
            LikedProduct likedProduct = await db.LikedProducts.FirstOrDefaultAsync(o => o.UserId == key.Column1 && 
            o.ProductId == key.Column2);
            if (likedProduct != null)
            {
                db.LikedProducts.Remove(likedProduct);
            }
        }

        public override async Task<IEnumerable<LikedProduct>> FindAsync(Func<LikedProduct, bool> predicate)
        {
            return await GetListAsync(predicate);
        }

        private Task<List<LikedProduct>> GetListAsync(Func<LikedProduct, bool> predicate)
        {
            return Task.Run(() => db.LikedProducts.Include(o => o.User)
            .Include(o => o.Product)
            .Where(predicate)
            .ToList());
        }

        public override async Task<LikedProduct> GetAsync(CompositeKey key)
        {
            return await db.LikedProducts.Include(o => o.User)
                .Include(o => o.Product)
                .FirstOrDefaultAsync(o => o.UserId == key.Column1 && o.ProductId == key.Column2);
        }
    }
}
