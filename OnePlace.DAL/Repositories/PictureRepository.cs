using OnePlace.DAL.EF;
using OnePlace.DAL.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;

namespace OnePlace.DAL.Repositories
{
    public class PictureRepository : RepositoryBase<Picture, int>
    {
        public PictureRepository(AppDbContext context, 
            UserManager<User> userManager): base(context, userManager) { }


        public override async Task DeleteAsync(int id)
        {
            Picture picture = await db.Pictures.FirstOrDefaultAsync(o => o.Id == id);
            if (picture != null)
            {
                db.Pictures.Remove(picture);
            }
        }

        public override async Task<IEnumerable<Picture>> FindAsync(Func<Picture, bool> predicate)
        {
            return await GetListAsync(predicate);
        }

        private Task<List<Picture>> GetListAsync(Func<Picture, bool> predicate)
        {
            return Task.Run(() => db.Pictures.Where(predicate).ToList());
        }

        public override async Task<Picture> GetAsync(int id)
        {
            return await db.Pictures.FirstOrDefaultAsync(o => o.Id == id);
        }
    }
}
