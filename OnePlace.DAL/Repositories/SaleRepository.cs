using OnePlace.DAL.EF;
using OnePlace.DAL.Entities;
using OnePlace.DAL.Interfaces;
using System.Data.Entity;

namespace OnePlace.DAL.Repositories
{
    public class SaleRepository : IRepository<Sale, int>
    {
        private AppDbContext db;
        public SaleRepository(AppDbContext context)
        {
            this.db = context;
        }
        public void Create(Sale sale)
        {
            db.Sales.Add(sale);
        }

        public async Task DeleteAsync(int id)
        {
            Sale sale = await db.Sales.FirstOrDefaultAsync(o => o.Id == id);
            if (sale != null)
            {
                db.Sales.Remove(sale);
            }
        }

        public async Task<IEnumerable<Sale>> FindAsync(Func<Sale, bool> predicate)
        {
            return await GetListAsync(predicate);
        }

        private Task<List<Sale>> GetListAsync(Func<Sale, bool> predicate)
        {
            return Task.Run(() => db.Sales.Where(predicate).ToList());
        }

        public async Task<Sale> GetAsync(int id)
        {
            return await db.Sales.FirstOrDefaultAsync(o => o.Id == id);
        }

        public async Task<IEnumerable<Sale>> GetAllAsync()
        {
            return await db.Sales.ToListAsync();
        }

        public void Update(Sale sale)
        {
            db.Entry(sale).State = (Microsoft.EntityFrameworkCore.EntityState)EntityState.Modified;
        }
    }
}
