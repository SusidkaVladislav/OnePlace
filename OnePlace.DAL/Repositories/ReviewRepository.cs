﻿using OnePlace.DAL.EF;
using OnePlace.DAL.Entities;
using OnePlace.DAL.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;

namespace OnePlace.DAL.Repositories
{
    public class ReviewRepository : RepositoryBase<Review, int>
    {
        public ReviewRepository(AppDbContext context,
            UserManager<User> userManager) : base(context, userManager) { }


        public override async Task DeleteAsync(int id)
        {
            Review review = await db.Reviews.FirstOrDefaultAsync(o => o.Id == id);
            if (review != null)
            {
                db.Reviews.Remove(review);
            }
        }

        public override async Task<IEnumerable<Review>> FindAsync(Func<Review, bool> predicate)
        {
            return await GetListAsync(predicate);
        }

        private Task<List<Review>> GetListAsync(Func<Review, bool> predicate)
        {
            return Task.Run(() => db.Reviews
            .Include(o => o.User)
            .Include(o => o.Product)
            .Where(predicate).ToList());
        }

        public override async Task<Review> GetAsync(int id)
        {
            return await db.Reviews
                .Include(o => o.User)
                .Include(o => o.Product)
                .FirstOrDefaultAsync(o => o.Id == id);
        }

        public override async Task<IEnumerable<Review>> GetAllAsync()
        {
            return await db.Reviews
                .Include(o => o.User)
                .Include(o => o.Product)
                .ToListAsync();
        }
    }
}
