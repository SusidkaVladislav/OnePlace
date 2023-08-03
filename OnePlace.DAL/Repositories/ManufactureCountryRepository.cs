using OnePlace.DAL.EF;
using OnePlace.DAL.Entities;
using OnePlace.DAL.Interfaces;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OnePlace.DAL.Repositories
{
    public class ManufactureCountryRepository : IRepository<ManufactureCountry, int>
    {
        private AppDbContext db;
        public ManufactureCountryRepository(AppDbContext context)
        {
            this.db = context;
        }
        public void Create(ManufactureCountry item)
        {
            db.ManufactureCountries.Add(item);
        }

        public void Delete(int id)
        {
            ManufactureCountry manufactureCountry = db.ManufactureCountries.FirstOrDefault(o => o.Id == id);
            if (manufactureCountry != null)
            {
                db.ManufactureCountries.Remove(manufactureCountry);
            }
        }

        public IEnumerable<ManufactureCountry> Find(Func<ManufactureCountry, bool> predicate)
        {
            return db.ManufactureCountries.Include(o => o.Products).Where(predicate).ToList();
        }

        public ManufactureCountry Get(int id)
        {
            return db.ManufactureCountries.Include(o => o.Products).FirstOrDefault(o => o.Id == id);
        }

        public IEnumerable<ManufactureCountry> GetAll()
        {
            return db.ManufactureCountries;
        }

        public void Update(ManufactureCountry item)
        {
            db.Entry(item).State = (Microsoft.EntityFrameworkCore.EntityState)EntityState.Modified;
        }
    }
}
