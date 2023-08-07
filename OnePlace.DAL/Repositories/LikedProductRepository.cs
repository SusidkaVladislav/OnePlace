using OnePlace.DAL.EF;
using OnePlace.DAL.Entities;
using OnePlace.DAL.Interfaces;
using System.Data.Entity;

namespace OnePlace.DAL.Repositories
{
    public class LikedProductRepository : IRepository<LikedProduct, CompositeKey>
    {
        private AppDbContext db;
        public LikedProductRepository(AppDbContext context)
        {
            this.db = context;
        }

        public void Create(LikedProduct likedProduct)
        {
            db.LikedProducts.Add(likedProduct);
        }

        public async Task DeleteAsync(CompositeKey key)
        {
            LikedProduct likedProduct = await db.LikedProducts.FirstOrDefaultAsync(o => o.UserId == key.Column1 && 
            o.ProductId == key.Column2);
            if (likedProduct != null)
            {
                db.LikedProducts.Remove(likedProduct);
            }
        }

        public async Task<IEnumerable<LikedProduct>> FindAsync(Func<LikedProduct, bool> predicate)
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

        public async Task<LikedProduct> GetAsync(CompositeKey key)
        {
            return await db.LikedProducts.Include(o => o.User)
                .Include(o => o.Product)
                .FirstOrDefaultAsync(o => o.UserId == key.Column1 && o.ProductId == key.Column2);
        }

        public async Task<IEnumerable<LikedProduct>> GetAllAsync()
        {
            return await db.LikedProducts.ToListAsync();
        }

        public void Update(LikedProduct likedProduct)
        {
            db.Entry(likedProduct).State = (Microsoft.EntityFrameworkCore.EntityState)EntityState.Modified;
        }
    }
}
