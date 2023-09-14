﻿using OnePlace.DAL.EF;
using OnePlace.DAL.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;

namespace OnePlace.DAL.Repositories
{
    public class ProductPictureRepository : RepositoryBase<ProductPicture, Composite2Key>
    {
        public ProductPictureRepository(AppDbContext context, 
            UserManager<User> userManager): base(context, userManager) { }


        public override async Task DeleteAsync(Composite2Key key)
        {
            ProductPicture productPicture = await db.ProductPictures
                .FirstOrDefaultAsync(o => o.ProductId == key.Column1 && o.PictureId == key.Column2);
            if (productPicture != null)
            {
                db.ProductPictures.Remove(productPicture);
            }
        }

        public override async Task<IEnumerable<ProductPicture>> FindAsync(Func<ProductPicture, bool> predicate)
        {
            return await GetListAsync(predicate);
        }

        private Task<List<ProductPicture>> GetListAsync(Func<ProductPicture, bool> predicate)
        {
            return Task.Run(() => db.ProductPictures.Include(o => o.Picture).Where(predicate).ToList());
        }

        public override async Task<ProductPicture> GetAsync(Composite2Key key)
        {
            return await db.ProductPictures
                .Include(o => o.Picture)
                .FirstOrDefaultAsync(o => o.ProductId == key.Column1 && o.PictureId == key.Column2);
        }
    }
}