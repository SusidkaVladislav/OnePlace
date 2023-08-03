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
    public class WarehouseRepository : IRepository<Warehouse, int>
    {
        private AppDbContext db;
        public WarehouseRepository(AppDbContext context)
        {
            this.db = context;
        }
        public void Create(Warehouse item)
        {
            db.Warehouses.Add(item);
        }

        public void Delete(int id)
        {
            Warehouse warehouse = db.Warehouses.FirstOrDefault(o => o.Id == id);
            if (warehouse != null)
            {
                db.Warehouses.Remove(warehouse);
            }
        }

        public IEnumerable<Warehouse> Find(Func<Warehouse, bool> predicate)
        {
            return db.Warehouses.Where(predicate).ToList();
        }

        public Warehouse Get(int id)
        {
            return db.Warehouses.FirstOrDefault(o => o.Id == id);
        }

        public IEnumerable<Warehouse> GetAll()
        {
            return db.Warehouses;
        }

        public void Update(Warehouse item)
        {
            db.Entry(item).State = (Microsoft.EntityFrameworkCore.EntityState)EntityState.Modified;
        }
    }
}
