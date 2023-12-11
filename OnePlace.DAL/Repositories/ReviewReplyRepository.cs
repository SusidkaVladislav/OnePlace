using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using OnePlace.DAL.EF;
using OnePlace.DAL.Entities;

namespace OnePlace.DAL.Repositories
{
    public class ReviewReplyRepository : RepositoryBase<ReviewReply, int>
    {
        public ReviewReplyRepository(AppDbContext context,
            UserManager<User> userManager) : base(context, userManager) { }

        public override async Task DeleteAsync(int id)
        {
            ReviewReply reviewReply = await db.ReviewReplies.FirstOrDefaultAsync(o => o.ReviewId == id);
            if (reviewReply != null)
            {
                db.ReviewReplies.Remove(reviewReply);
            }
        }

        public override async Task<IEnumerable<ReviewReply>> FindAsync(Func<ReviewReply, bool> predicate)
        {
            //return await GetListAsync(predicate);
            throw new NotImplementedException();
        }

        private Task<List<ReviewReply>> GetListAsync(Func<ReviewReply, bool> predicate)
        {
            //return Task.Run(() => db.ReviewReplies.Where(predicate).ToList());
            throw new NotImplementedException();
        }

        public override async Task<ReviewReply> GetAsync(int id)
        {
            return await db.ReviewReplies.FirstOrDefaultAsync(o => o.ReviewId == id);
        }
    }
}
