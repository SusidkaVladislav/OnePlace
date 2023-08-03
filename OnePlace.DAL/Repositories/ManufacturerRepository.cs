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
    public class ManufacturerRepository : IRepository<Manufacturer, int>
    {
        private AppDbContext db;
        public ManufacturerRepository(AppDbContext context)
        {
            this.db = context;
        }
        public void Create(Manufacturer item)
        {
            db.Manufacturers.Add(item);
        }

        public void Delete(int id)
        {
            Manufacturer manufacturer = db.Manufacturers.FirstOrDefault(o => o.Id == id);
            if (manufacturer != null)
            {
                db.Manufacturers.Remove(manufacturer);
            }
        }

        public IEnumerable<Manufacturer> Find(Func<Manufacturer, bool> predicate)
        {
            return db.Manufacturers.Include(o => o.Products).Where(predicate).ToList();
        }

        public Manufacturer Get(int id)
        {
            return db.Manufacturers.Include(o => o.Products).FirstOrDefault(o => o.Id == id);
        }

        public IEnumerable<Manufacturer> GetAll()
        {
            return db.Manufacturers;
        }

        public void Update(Manufacturer item)
        {
            db.Entry(item).State = (Microsoft.EntityFrameworkCore.EntityState)EntityState.Modified;
        }
    }
}
