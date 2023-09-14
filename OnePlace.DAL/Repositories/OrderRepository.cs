using LinqKit;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using OnePlace.DAL.EF;
using OnePlace.DAL.Entities;
using OnePlace.DAL.Models;
using OnePlace.DAL.SearchParams;
using System.Collections.Generic;
using System.Data;

namespace OnePlace.DAL.Repositories
{
    public class OrderRepository : RepositoryBase<Order, int>
    {
        public OrderRepository(AppDbContext context, 
            UserManager<User> userManager): base(context, userManager) { }

        private const int LIMIT = 10;
        public override async Task DeleteAsync(int id)
        {
            Order order = await db.Orders.FirstOrDefaultAsync(o => o.Id == id);
            if (order != null)
            {
                db.Orders.Remove(order);
            }
        }

        public override async Task<IEnumerable<Order>> FindAsync(Func<Order, bool> predicate)
        {
            return await GetListAsync(predicate);
        }

        private Task<List<Order>> GetListAsync(Func<Order, bool> predicate)
        {
            return Task.Run(() => db.Orders.Include(o => o.User).Where(predicate).ToList());
        }

        public override async Task<Order> GetAsync(int id)
        {

            return await db.Orders
                .Include(o => o.User)
                .Include(o => o.OrderProducts)
                .FirstOrDefaultAsync(o => o.Id == id);
        }

        public override async Task<PaginatedList<Order>> Filter<S>(S searchParamsModel)
        {
            var searchParams = searchParamsModel as OrderSearchParams;

            try
            {
                if (searchParams.Page <= 0 || searchParams.Page is null)
                    searchParams.Page = 1;

                IQueryable<Order> query = db.Orders.AsNoTracking();

                var predicate = PredicateBuilder.New<Order>(true);

                //Замовлення тільки конкретного користувача
                if (searchParams.UserId.HasValue)
                {
                    predicate = predicate.And(o=>o.UserId == searchParams.UserId);
                }

                //Тільки ті замовлення стан яких рівний переданому 
                if (searchParams.State.HasValue)
                {
                    predicate = predicate.And(o => o.State == searchParams.State);
                }

                //Тільки новіші за передану дату, або з такою датою
                if (searchParams.Date.HasValue)
                {
                    predicate = predicate.And(o => o.Date.Date >= searchParams.Date.Value.Date);
                }

                //Тільки замовлення, статус оплати яких рівний переданому
                if(searchParams.PaymentStatus.HasValue)
                {
                    predicate = predicate.And(o => o.PaymentStatus == searchParams.PaymentStatus.Value);
                }

                //Ім'я або прізвище покупця
                if (!string.IsNullOrEmpty(searchParams.UserInitials))
                {
                    predicate = predicate.And(o => o.Name.Contains(searchParams.UserInitials) ||
                        o.Surname.Contains(searchParams.UserInitials));
                }

                query = query.Include(o => o.User);

                //Виконання предикату
                query = query.Where(predicate).Skip((searchParams.Page.Value - 1) * LIMIT)
                    .Take(LIMIT);

                //Кількість всіх замовлень для повернення
                var totalCount = await query.CountAsync();

                //Перетворення query в список
                var orders = await query.ToListAsync();

                //Формування пагінованого списку
                PaginatedList<Order> paginatedList = new PaginatedList<Order>
                {
                    Items = orders,
                    Total = totalCount
                };

                return paginatedList;
            }
            catch (ArgumentNullException ex)
            {
                throw new ArgumentNullException(nameof(searchParamsModel) + " null категорія");
            }
        }
    }
}
