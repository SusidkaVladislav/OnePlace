using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using OnePlace.DAL.EF;
using OnePlace.DAL.Entities;

namespace OnePlace.DAL.Repositories
{
    public class MaterialRepository : RepositoryBase<Material, int>
    {
        public MaterialRepository(AppDbContext context, 
            UserManager<User> userManager): base(context, userManager) { }

        public override async Task DeleteAsync(int id)
        {
            Material material = await db.Materials.FirstOrDefaultAsync(o => o.Id == id);
            if (material != null)
            {
                db.Materials.Remove(material);
            }
        }

        public override async Task<IEnumerable<Material>> FindAsync(Func<Material, bool> predicate)
        {
            return await GetListAsync(predicate);
        }

        private Task<List<Material>> GetListAsync(Func<Material, bool> predicate)
        {
            return Task.Run(() => db.Materials.Include(o => o.Products).Where(predicate).ToList());
        }

        public override async Task<Material> GetAsync(int id)
        {
            return await db.Materials.Include(o => o.Products).FirstOrDefaultAsync(o => o.Id == id);
        }
    }
}
