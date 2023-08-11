using Microsoft.EntityFrameworkCore;
using OnePlace.DAL.EF;
using OnePlace.DAL.Entities;
namespace OnePlace.DAL.Repositories
{
    public class DescriptionRepository : RepositoryBase<Description, int>
    {
        public DescriptionRepository(AppDbContext context): base(context) { }

        public override async Task DeleteAsync(int id)
        {
            Description description = await db.Descriptions.FirstOrDefaultAsync(o => o.Id == id);
            if (description != null)
            {
                db.Descriptions.Remove(description);
            }
        }

        public override async Task<IEnumerable<Description>> FindAsync(Func<Description, bool> predicate)
        {
            return await GetListAsync(predicate);
        }

        private Task<List<Description>> GetListAsync(Func<Description, bool> predicate)
        {
            return Task.Run(() => db.Descriptions.Where(predicate).ToList());
        }

        public override async Task<Description> GetAsync(int id)
        {
            return await db.Descriptions.FirstOrDefaultAsync(o => o.Id == id);
        }
    }
}
