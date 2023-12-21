﻿using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using OnePlace.DAL.EF;
using OnePlace.DAL.Entities;

namespace OnePlace.DAL.Repositories
{
    public class SaleRepository : RepositoryBase<Sale, int>
    {
        public SaleRepository(AppDbContext context,
            UserManager<User> userManager) : base(context, userManager) { }


        public override async Task DeleteAsync(int id)
        {
            Sale sale = await db.Sales.FirstOrDefaultAsync(o => o.Id == id);
            if (sale != null)
            {
                db.Sales.Remove(sale);
            }
        }

        public override async Task<IEnumerable<Sale>> FindAsync(Func<Sale, bool> predicate)
        {
            return await GetListAsync(predicate);
        }

        private Task<List<Sale>> GetListAsync(Func<Sale, bool> predicate)
        {
            return Task.Run(() => db.Sales.Where(predicate).ToList());
        }

        public override async Task<Sale> GetAsync(int id)
        {
            return await db.Sales.FirstOrDefaultAsync(o => o.Id == id);
        }
    }
}