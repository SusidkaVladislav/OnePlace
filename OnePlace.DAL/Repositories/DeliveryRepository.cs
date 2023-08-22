using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using OnePlace.DAL.EF;
using OnePlace.DAL.Entities;

namespace OnePlace.DAL.Repositories
{
    //public class DeliveryRepository: RepositoryBase<Delivery, int>
    //{
    //    public DeliveryRepository(AppDbContext context, UserManager<User> userManager): base(context, userManager) { }  

    //    public override async Task DeleteAsync(int id)
    //    {
    //        Delivery delivery = await db.Deliveries.FirstOrDefaultAsync(o => o.Id == id);
    //        if (delivery != null)
    //        {
    //            db.Deliveries.Remove(delivery);
    //        }
    //    }

    //    public override async Task<IEnumerable<Delivery>> FindAsync(Func<Delivery, bool> predicate)
    //    {
    //        return await GetListAsync(predicate);
    //    }

    //    private Task<List<Delivery>> GetListAsync(Func<Delivery, bool> predicate)
    //    {
    //        return Task.Run(() => db.Deliveries/*.Include(o => o.Picture)*/.Where(predicate).ToList());
    //    }

    //    public override async Task<Delivery> GetAsync(int id)
    //    {
    //        return await db.Deliveries/*Include(o => o.Picture).*/.FirstOrDefaultAsync(o => o.Id == id);
    //    }

    //    public override async Task<IEnumerable<Delivery>> GetAllAsync()
    //    {
    //        return await db.Deliveries./*Include(o => o.Picture).*/ToListAsync();
    //    }
    //}
}
