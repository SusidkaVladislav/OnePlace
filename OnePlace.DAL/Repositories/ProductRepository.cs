using OnePlace.DAL.EF;
using OnePlace.DAL.Entities;
using OnePlace.DAL.Interfaces;
//using System.Data.Entity;
using Microsoft.EntityFrameworkCore;

namespace OnePlace.DAL.Repositories
{
    public class ProductRepository : IRepository<Product, int>
    {
        private AppDbContext db;
        public ProductRepository(AppDbContext context)
        {
            this.db = context;
        }
        public void Create(Product product)
        {
            db.Products.Add(product);
        }

        public async Task DeleteAsync(int id)
        {
            Product product = await db.Products.FirstOrDefaultAsync(o => o.Id == id);
            if (product != null)
            {
                db.Products.Remove(product);
            }
        }

        public async Task<IEnumerable<Product>> FindAsync(Func<Product, bool> predicate)
        {
            return await GetListAsync(predicate);
        }

        private Task<List<Product>> GetListAsync(Func<Product, bool> predicate)
        {
            return Task.Run(() => db.Products
                .Include(o => o.ManufacturerCountry)
                .Include(o => o.Manufacturer)
                .Include(o => o.Material)
                .Include(o => o.Color)
                .Include(o => o.Gender)
                .Include(o => o.Category)
                .Include(o => o.Reviews)
                .Include(o => o.ProductDescriptions)
                .Include(o => o.ProductPictures)
                .Where(predicate).ToList());
        }

        public async Task<Product> GetAsync(int id)
        {
            return await db.Products
                .Include(o => o.ManufacturerCountry)
                .Include(o => o.Manufacturer)
                .Include(o => o.Material)
                .Include(o => o.Color)
                .Include(o => o.Gender)
                .Include(o => o.Category)
                .Include(o => o.Reviews)
                .Include(o => o.ProductDescriptions)
                .Include(o => o.ProductPictures)
                .FirstOrDefaultAsync(o => o.Id == id);
        }

        public async Task<IEnumerable<Product>> GetAllAsync()
        {
            return await db.Products.Include(o => o.ProductPictures).ToListAsync();
        }

        public void Update(Product product)
        {
            db.Entry(product).State = (Microsoft.EntityFrameworkCore.EntityState)EntityState.Modified;
        }
    }
}
