using OnePlace.DAL.EF;
using OnePlace.DAL.Entities;
using OnePlace.DAL.Interfaces;
using System.Data.Entity;

namespace OnePlace.DAL.Repositories
{
    public class ProductDescriptionRepository : IRepository<ProductDescription, CompositeKey>
    {
        private AppDbContext db;
        public ProductDescriptionRepository(AppDbContext context)
        {
            this.db = context;
        }
        public void Create(ProductDescription productDescription)
        {
            db.ProductDescriptions.Add(productDescription);
        }

        public async Task DeleteAsync(CompositeKey key)
        {
            ProductDescription productDescription = await db.ProductDescriptions.FirstOrDefaultAsync(
                o => o.DescriptionId == key.Column1 && o.ProductId == key.Column2);
            if (productDescription != null)
            {
                db.ProductDescriptions.Remove(productDescription);
            }
        }

        public async Task<IEnumerable<ProductDescription>> FindAsync(Func<ProductDescription, bool> predicate)
        {
            return await GetListAsync(predicate);
        }

        private Task<List<ProductDescription>> GetListAsync(Func<ProductDescription, bool> predicate)
        {
            return Task.Run(() => db.ProductDescriptions.Include(o => o.Description).Where(predicate).ToList());
        }

        public async Task<ProductDescription> GetAsync(CompositeKey key)
        {
            return await db.ProductDescriptions
                .Include(o => o.Description)
                .FirstOrDefaultAsync(o => o.DescriptionId == key.Column1 && o.ProductId == key.Column2);
        }

        public async Task<IEnumerable<ProductDescription>> GetAllAsync()
        {
            return await db.ProductDescriptions.ToListAsync();
        }

        public void Update(ProductDescription productDescription)
        {
            db.Entry(productDescription).State = (Microsoft.EntityFrameworkCore.EntityState)EntityState.Modified;
        }
    }
}
