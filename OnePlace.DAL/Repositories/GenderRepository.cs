using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using OnePlace.DAL.EF;
using OnePlace.DAL.Entities;
using OnePlace.DAL.Models;

namespace OnePlace.DAL.Repositories
{
    public class GenderRepository :RepositoryBase<Gender, int>
    {
        public GenderRepository(AppDbContext context, UserManager<User> userManager) : base(context, userManager) { }
        
        public override async Task DeleteAsync(int id)
        {
            Gender gender = await db.Genders.FirstOrDefaultAsync(o => o.Id == id);
            if (gender != null)
            {
                db.Genders.Remove(gender);
            }
        }

        public override async Task<IEnumerable<Gender>> FindAsync(Func<Gender, bool> predicate)
        {
            return await GetListAsync(predicate);
        }

        private Task<List<Gender>> GetListAsync(Func<Gender, bool> predicate)
        {
            return Task.Run(() => db.Genders.Include(o => o.Products).Where(predicate).ToList());
        }

        public override async Task<Gender> GetAsync(int id)
        {
            return await db.Genders.Include(o => o.Products).FirstOrDefaultAsync(o => o.Id == id);
        }

        public override Task<PaginatedList<Gender>> Filter<S>(S searchParamsModel)
        {
            return base.Filter(searchParamsModel);
        }
    }
}
