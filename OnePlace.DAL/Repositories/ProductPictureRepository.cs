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
    public class ProductPictureRepository : IRepository<ProductPicture, CompositeKey>
    {
        private AppDbContext db;
        public ProductPictureRepository(AppDbContext context)
        {
            this.db = context;
        }
        public void Create(ProductPicture item)
        {
            db.ProductPictures.Add(item);
        }

        public void Delete(CompositeKey key)
        {
            ProductPicture productPicture = db.ProductPictures.FirstOrDefault(o => o.ProductId == key.Column1 && o.PictureId == key.Column2);
            if (productPicture != null)
            {
                db.ProductPictures.Remove(productPicture);
            }
        }

        public IEnumerable<ProductPicture> Find(Func<ProductPicture, bool> predicate)
        {
            return db.ProductPictures.Include(o => o.Picture).Where(predicate).ToList();
        }

        public ProductPicture Get(CompositeKey key)
        {
            return db.ProductPictures.Include(o => o.Picture).FirstOrDefault(o => o.ProductId == key.Column1 && o.PictureId == key.Column2);
        }

        public IEnumerable<ProductPicture> GetAll()
        {
            return db.ProductPictures;
        }

        public void Update(ProductPicture item)
        {
            db.Entry(item).State = (Microsoft.EntityFrameworkCore.EntityState)EntityState.Modified;
        }
    }
}
