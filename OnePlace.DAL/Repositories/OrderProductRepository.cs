using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using OnePlace.DAL.EF;
using OnePlace.DAL.Entities;

namespace OnePlace.DAL.Repositories
{
    public class OrderProductRepository : RepositoryBase<OrderProduct, Composite3Key>
    {
        public OrderProductRepository(AppDbContext context, 
            UserManager<User> userManager): base(context, userManager) { }


        public override async Task DeleteAsync(Composite3Key key)
        {
            OrderProduct orderProduct = await db.OrderProducts.FirstOrDefaultAsync(
                o => o.OrderId == key.Column1 && o.ProductId == key.Column2 && o.ColorId == key.Column3);
            if (orderProduct != null)
            {
                db.OrderProducts.Remove(orderProduct);
            }
        }

        public override async Task<IEnumerable<OrderProduct>> FindAsync(Func<OrderProduct, bool> predicate)
        {
            return await GetListAsync(predicate);
        }

        private Task<List<OrderProduct>> GetListAsync(Func<OrderProduct, bool> predicate)
        {
            return Task.Run(() => db.OrderProducts.Where(predicate).ToList());
        }

        public override async Task<OrderProduct> GetAsync(Composite3Key key)
        {
            return await db.OrderProducts.FirstOrDefaultAsync(o => o.OrderId == key.Column1 && o.ProductId == key.Column2 && o.ColorId == key.Column3);
        }
    }
}
