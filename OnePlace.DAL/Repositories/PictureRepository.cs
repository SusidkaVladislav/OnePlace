using OnePlace.DAL.EF;
using OnePlace.DAL.Entities;
using OnePlace.DAL.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.Entity;

namespace OnePlace.DAL.Repositories
{
    public class PictureRepository : IRepository<Picture, int>
    {
        private AppDbContext db;
        public PictureRepository(AppDbContext context)
        {
            this.db = context;
        }
        public void Create(Picture item)
        {
            db.Pictures.Add(item);
        }

        public void Delete(int id)
        {
            Picture picture = db.Pictures.FirstOrDefault(o => o.Id == id);
            if (picture != null)
            {
                db.Pictures.Remove(picture);
            }
        }

        public IEnumerable<Picture> Find(Func<Picture, bool> predicate)
        {
            return db.Pictures.Where(predicate).ToList();
        }

        public Picture Get(int id)
        {
            return db.Pictures.FirstOrDefault(o => o.Id == id);
        }

        public IEnumerable<Picture> GetAll()
        {
            return db.Pictures;
        }

        public void Update(Picture item)
        {
            db.Entry(item).State = (Microsoft.EntityFrameworkCore.EntityState)EntityState.Modified;
        }
    }
}
