using OnePlace.DAL.EF;
using OnePlace.DAL.Entities;
using OnePlace.DAL.Interfaces;
using System.Data.Entity;

namespace OnePlace.DAL.Repositories
{
    public class ManufactureCountryRepository : IRepository<ManufactureCountry, int>
    {
        private AppDbContext db;
        public ManufactureCountryRepository(AppDbContext context)
        {
            this.db = context;
        }
        public void Create(ManufactureCountry manufactureCountry)
        {
            db.ManufactureCountries.Add(manufactureCountry);
        }

        public async Task DeleteAsync(int id)
        {
            ManufactureCountry manufactureCountry = await db.ManufactureCountries.FirstOrDefaultAsync(o => o.Id == id);
            if (manufactureCountry != null)
            {
                db.ManufactureCountries.Remove(manufactureCountry);
            }
        }

        public async Task<IEnumerable<ManufactureCountry>> FindAsync(Func<ManufactureCountry, bool> predicate)
        {
            return await GetListAsync(predicate);
        }

        private Task<List<ManufactureCountry>> GetListAsync(Func<ManufactureCountry, bool> predicate)
        {
            return Task.Run(() => db.ManufactureCountries.Include(o => o.Products)
            .Where(predicate)
            .ToList());
        }

        public async Task<ManufactureCountry> GetAsync(int id)
        {
            return await db.ManufactureCountries.Include(o => o.Products).FirstOrDefaultAsync(o => o.Id == id);
        }

        public async Task<IEnumerable<ManufactureCountry>> GetAllAsync()
        {
            return await db.ManufactureCountries.ToListAsync();
        }

        public void Update(ManufactureCountry manufactureCountry)
        {
            db.Entry(manufactureCountry).State = (Microsoft.EntityFrameworkCore.EntityState)EntityState.Modified;
        }
    }
}
