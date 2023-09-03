using Microsoft.EntityFrameworkCore;
using OnePlace.DAL.EF;
using OnePlace.DAL.Entities;
using OnePlace.DAL.Interfaces;
using OnePlace.DAL.Repositories;

namespace OnePlace.DAL
{
    public static class ExtensionRepository
    {
        static ExtensionRepository() { }

        public async static Task<int> GetLastNumberAsync(this IRepository<Order, int> orderRepository)
        {

            if (orderRepository is IAppDbContextProvider dbContextProvider)
            {
                AppDbContext dbContext = dbContextProvider.GetDbContext();

                int lastOrderNumber = await dbContext.Orders.MaxAsync(o => o.Number);
                return lastOrderNumber;
            }

            throw new Exception("AppDbContext is not available.");
        }

    }
}
