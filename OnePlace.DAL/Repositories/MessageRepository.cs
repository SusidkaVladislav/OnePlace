using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using OnePlace.DAL.EF;
using OnePlace.DAL.Entities;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OnePlace.DAL.Repositories
{
    public class MessageRepository : RepositoryBase<Message, int>
    {
        public MessageRepository(AppDbContext context,
            UserManager<User> userManager) : base(context, userManager) { }

        public override async Task DeleteAsync(int id)
        {
            Message message = await db.Messages.FirstOrDefaultAsync(o => o.Id == id);
            if (message != null)
            {
                db.Messages.Remove(message);
            }
        }

        public override async Task<IEnumerable<Message>> FindAsync(Func<Message, bool> predicate)
        {
            return await GetListAsync(predicate);
        }

        private Task<List<Message>> GetListAsync(Func<Message, bool> predicate)
        {
            return Task.Run(() => db.Messages
                .Include(m => m.User)
                .Include(m => m.Product)
                .Where(predicate).ToList());
        }

        public override async Task<IEnumerable<Message>> GetAllAsync()
        {
            return await db.Messages
                .Include(m => m.User)
                .Include(m => m.Product)
                .ToListAsync();
        }

        public override async Task<Message> GetAsync(int id)
        {
            return await db.Messages
                .Include(m => m.User)
                .Include(m => m.Product)
                .FirstOrDefaultAsync(o => o.Id == id);
        }
    }
}
