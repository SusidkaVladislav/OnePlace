using OnePlace.DAL.EF;
using OnePlace.DAL.Entities;
using OnePlace.DAL.Interfaces;

using Microsoft.EntityFrameworkCore;
namespace OnePlace.DAL.Repositories
{
    public class ProductPictureRepository : RepositoryBase<ProductPicture, CompositeKey>
    {
        public ProductPictureRepository(AppDbContext context): base(context) { }


        public override async Task DeleteAsync(CompositeKey key)
        {
            ProductPicture productPicture = await db.ProductPictures
                .FirstOrDefaultAsync(o => o.ProductId == key.Column1 && o.PictureId == key.Column2);
            if (productPicture != null)
            {
                db.ProductPictures.Remove(productPicture);
            }
        }

        public override async Task<IEnumerable<ProductPicture>> FindAsync(Func<ProductPicture, bool> predicate)
        {
            return await GetListAsync(predicate);
        }

        private Task<List<ProductPicture>> GetListAsync(Func<ProductPicture, bool> predicate)
        {
            return Task.Run(() => db.ProductPictures.Include(o => o.Picture).Where(predicate).ToList());
        }

        public override async Task<ProductPicture> GetAsync(CompositeKey key)
        {
            return await db.ProductPictures
                .Include(o => o.Picture)
                .FirstOrDefaultAsync(o => o.ProductId == key.Column1 && o.PictureId == key.Column2);
        }
    }
}
