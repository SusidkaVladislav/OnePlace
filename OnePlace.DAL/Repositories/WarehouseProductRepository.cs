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
    public class WarehouseProductRepository : IRepository<WarehouseProduct, CompositeKey>
    {
        private AppDbContext db;
        public WarehouseProductRepository(AppDbContext context)
        {
            this.db = context;
        }
        public void Create(WarehouseProduct item)
        {
            db.WarehouseProducts.Add(item);
        }

        public void Delete(CompositeKey key)
        {
            WarehouseProduct warehouseProduct = db.WarehouseProducts.FirstOrDefault(o => o.WarehouseId == key.Column1 && o.ProductId == key.Column2);
            if (warehouseProduct != null)
            {
                db.WarehouseProducts.Remove(warehouseProduct);
            }
        }

        public IEnumerable<WarehouseProduct> Find(Func<WarehouseProduct, bool> predicate)
        {
            return db.WarehouseProducts.Include(o => o.Warehouse).Where(predicate).ToList();
        }

        public WarehouseProduct Get(CompositeKey key)
        {
            return db.WarehouseProducts.Include(o => o.Warehouse).FirstOrDefault(o => o.WarehouseId == key.Column1 && o.ProductId == key.Column2);
        }

        public IEnumerable<WarehouseProduct> GetAll()
        {
            return db.WarehouseProducts;
        }

        public void Update(WarehouseProduct item)
        {
            db.Entry(item).State = (Microsoft.EntityFrameworkCore.EntityState)EntityState.Modified;
        }
    }
}
