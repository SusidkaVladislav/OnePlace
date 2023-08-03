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
    public class MaterialRepository : IRepository<Material, int>
    {
        private AppDbContext db;
        public MaterialRepository(AppDbContext context)
        {
            this.db = context;
        }
        public void Create(Material item)
        {
            db.Materials.Add(item);
        }

        public void Delete(int id)
        {
            Material material = db.Materials.FirstOrDefault(o => o.Id == id);
            if (material != null)
            {
                db.Materials.Remove(material);
            }
        }

        public IEnumerable<Material> Find(Func<Material, bool> predicate)
        {
            return db.Materials.Include(o => o.Products).Where(predicate).ToList();
        }

        public Material Get(int id)
        {
            return db.Materials.Include(o => o.Products).FirstOrDefault(o => o.Id == id);
        }

        public IEnumerable<Material> GetAll()
        {
            return db.Materials;
        }

        public void Update(Material item)
        {
            db.Entry(item).State = (Microsoft.EntityFrameworkCore.EntityState)EntityState.Modified;
        }
    }
}
