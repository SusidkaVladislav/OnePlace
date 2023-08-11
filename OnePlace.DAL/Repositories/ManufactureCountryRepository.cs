using Microsoft.EntityFrameworkCore;
using OnePlace.DAL.EF;
using OnePlace.DAL.Entities;

namespace OnePlace.DAL.Repositories
{
    public class ManufactureCountryRepository : RepositoryBase<ManufactureCountry, int>
    {
        public ManufactureCountryRepository(AppDbContext context): base(context) { }    


        public override async Task DeleteAsync(int id)
        {
            ManufactureCountry manufactureCountry = await db.ManufactureCountries.FirstOrDefaultAsync(o => o.Id == id);
            if (manufactureCountry != null)
            {
                db.ManufactureCountries.Remove(manufactureCountry);
            }
        }

        public override async Task<IEnumerable<ManufactureCountry>> FindAsync(Func<ManufactureCountry, bool> predicate)
        {
            return await GetListAsync(predicate);
        }

        private Task<List<ManufactureCountry>> GetListAsync(Func<ManufactureCountry, bool> predicate)
        {
            return Task.Run(() => db.ManufactureCountries.Include(o => o.Products)
            .Where(predicate)
            .ToList());
        }

        public override async Task<ManufactureCountry> GetAsync(int id)
        {
            return await db.ManufactureCountries.Include(o => o.Products).FirstOrDefaultAsync(o => o.Id == id);
        }
    }
}
