using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using OnePlace.DAL.EF;
using OnePlace.DAL.Entities;

namespace OnePlace.DAL.Repositories
{
    public class ColorReository: RepositoryBase<Color, int>
    {
        public ColorReository(AppDbContext context, UserManager<User> userManager): base(context, userManager) { }

        public override async Task DeleteAsync(int id)
        {
            Color color = await db.Colors.FirstOrDefaultAsync(o => o.Id == id);
            if (color != null)
            {
                db.Colors.Remove(color);
            }
        }

        public override async Task<IEnumerable<Color>> FindAsync(Func<Color, bool> predicate)
        {
            return await GetListAsync(predicate);
        }

        private Task<List<Color>> GetListAsync(Func<Color, bool> predicate)
        {
            return Task.Run(() => db.Colors.Include(o => o.Products).Where(predicate).ToList());
        }

        public override async Task<Color> GetAsync(int id)
        {
            return await db.Colors.Include(o => o.Products).FirstOrDefaultAsync(o => o.Id == id);
        }
    }
}
