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
    public class SaleRepository : IRepository<Sale, int>
    {
        private AppDbContext db;
        public SaleRepository(AppDbContext context)
        {
            this.db = context;
        }
        public void Create(Sale item)
        {
            db.Sales.Add(item);
        }

        public void Delete(int id)
        {
            Sale sale = db.Sales.FirstOrDefault(o => o.Id == id);
            if (sale != null)
            {
                db.Sales.Remove(sale);
            }
        }

        public IEnumerable<Sale> Find(Func<Sale, bool> predicate)
        {
            return db.Sales.Where(predicate).ToList();
        }

        public Sale Get(int id)
        {
            return db.Sales.FirstOrDefault(o => o.Id == id);
        }

        public IEnumerable<Sale> GetAll()
        {
            return db.Sales;
        }

        public void Update(Sale item)
        {
            db.Entry(item).State = (Microsoft.EntityFrameworkCore.EntityState)EntityState.Modified;
        }
    }
}
