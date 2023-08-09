using OnePlace.DAL.EF;
using OnePlace.DAL.Entities;
using OnePlace.DAL.Interfaces;
//using System.Data.Entity;
using Microsoft.EntityFrameworkCore;
namespace OnePlace.DAL.Repositories
{
    public class ProductPictureRepository : IRepository<ProductPicture, CompositeKey>
    {
        private AppDbContext db;
        public ProductPictureRepository(AppDbContext context)
        {
            this.db = context;
        }
        public void Create(ProductPicture productPicture)
        {
            db.ProductPictures.Add(productPicture);
        }

        public async Task DeleteAsync(CompositeKey key)
        {
            ProductPicture productPicture = await db.ProductPictures
                .FirstOrDefaultAsync(o => o.ProductId == key.Column1 && o.PictureId == key.Column2);
            if (productPicture != null)
            {
                db.ProductPictures.Remove(productPicture);
            }
        }

        public async Task<IEnumerable<ProductPicture>> FindAsync(Func<ProductPicture, bool> predicate)
        {
            return await GetListAsync(predicate);
        }

        private Task<List<ProductPicture>> GetListAsync(Func<ProductPicture, bool> predicate)
        {
            return Task.Run(() => db.ProductPictures.Include(o => o.Picture).Where(predicate).ToList());
        }

        public async Task<ProductPicture> GetAsync(CompositeKey key)
        {
            return await db.ProductPictures
                .Include(o => o.Picture)
                .FirstOrDefaultAsync(o => o.ProductId == key.Column1 && o.PictureId == key.Column2);
        }

        public async Task<IEnumerable<ProductPicture>> GetAllAsync()
        {
            return await db.ProductPictures.ToListAsync();
        }

        public void Update(ProductPicture productPicture)
        {
            db.Entry(productPicture).State = (Microsoft.EntityFrameworkCore.EntityState)EntityState.Modified;
        }
    }
}
