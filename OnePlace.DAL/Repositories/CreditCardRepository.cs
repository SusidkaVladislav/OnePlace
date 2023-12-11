using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using OnePlace.DAL.EF;
using OnePlace.DAL.Entities;

namespace OnePlace.DAL.Repositories
{
    public class CreditCardRepository : RepositoryBase<CreditCard, int>
    {
        public CreditCardRepository(AppDbContext context,
            UserManager<User> userManager) : base(context, userManager) { }

        public override async Task DeleteAsync(int id)
        {
            throw new NotImplementedException();
        }

        public override async Task<IEnumerable<CreditCard>> FindAsync(Func<CreditCard, bool> predicate)
        {
            //return await GetListAsync(predicate);

            throw new NotImplementedException();
        }

        private Task<List<CreditCard>> GetListAsync(Func<CreditCard, bool> predicate)
        {
            //return Task.Run(() => db.CreditCards.Where(predicate).ToList());
            throw new NotImplementedException();
        }

        public override async Task<CreditCard> GetAsync(int id)
        {
            //return await db.CreditCards.FirstOrDefaultAsync(o => o.Id == id);

            throw new NotImplementedException();
        }
    }
}
