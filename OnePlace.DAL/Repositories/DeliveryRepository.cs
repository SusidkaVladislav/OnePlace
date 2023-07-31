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
    public class DeliveryRepository : IRepository<Delivery>
    {
        private AppDbContext db;
        public DeliveryRepository(AppDbContext context)
        {
            this.db = context;
        }
        public void Create(Delivery item)
        {
            db.Deliveries.Add(item);
        }

        public void Delete(int id)
        {
            Delivery delivery = db.Deliveries.Find(id);
            if (delivery != null)
            {
                db.Deliveries.Remove(delivery);
            }
        }

        public IEnumerable<Delivery> Find(Func<Delivery, bool> predicate)
        {
            return db.Deliveries.Include(o => o.Picture).Where(predicate).ToList();
        }

        public Delivery Get(int id)
        {
            return db.Deliveries.Find(id);
        }

        public IEnumerable<Delivery> GetAll()
        {
            return db.Deliveries.Include(o => o.Picture);
        }

        public void Update(Delivery item)
        {
            db.Entry(item).State = (Microsoft.EntityFrameworkCore.EntityState)EntityState.Modified;
        }
    }
}
