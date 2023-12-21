using LinqKit;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using OnePlace.DAL.EF;
using OnePlace.DAL.Entities;
using OnePlace.DAL.Models;
using OnePlace.DAL.SearchParams;

//using Abp.Linq.Extensions.QueryableExtensions;

namespace OnePlace.DAL.Repositories
{
    public class ProductRepository : RepositoryBase<Product, int>
    {
        public ProductRepository(AppDbContext context, UserManager<User> userManager) : base(context, userManager) { }

        /// <summary>
        /// Кількість товарів які повертаються на клієнт
        /// </summary>
        //private const int LIMIT = 30;

        public override async Task DeleteAsync(int id)
        {
            Product product = await db.Products.FirstOrDefaultAsync(o => o.Id == id);
            if (product != null)
            {
                db.Products.Remove(product);
            }
        }

        private Task<List<Product>> GetListAsync(Func<Product, bool> predicate)
        {
            return Task.Run(() => db.Products
                .Include(o => o.ManufacturerCountry)
                .Include(o => o.Manufacturer)
                .Include(o => o.Category)
                .Include(o => o.Reviews)
                .Include(o => o.ProductDescriptions)
                .Include(o => o.ProductPictures)
                .Include(o => o.ProductColors)
                .Where(predicate).ToList());
        }


        public override async Task<IEnumerable<Product>> FindAsync(Func<Product, bool> predicate)
        {
            return await GetListAsync(predicate);
        }

        public override async Task<PaginatedList<Product>> Filter<T>(T searchParamsModel)
        {
            var searchParams = searchParamsModel as ProductSearchParams;

            //Фільтруються тільки продукти певної (поточної) категорії
            try
            {
                if (searchParams.Page <= 0 || searchParams.Page is null)
                    searchParams.Page = 1;

                IQueryable<Product> query = db.Products.Where(p => p.CategoryId == searchParams.Category)
                   .AsNoTracking();

                var predicate = PredicateBuilder.New<Product>(true);

                //Фiльтрація за кольорами
                if (searchParams.Colors.Any())
                {
                    predicate = predicate.And(p => p.ProductColors
                    .Any(c => searchParams.Colors
                    .Any(d => d == c.ColorId)));
                }

                //Максимальна допустима ціна товару
                if (searchParams.MaxPrice.HasValue)
                {
                    predicate = predicate.And(p => p.ProductColors
                    .Select(p => p.Price).Max() <= searchParams.MaxPrice.Value);
                }

                //мінімальна допустима ціна товару
                if (searchParams.MinPrice.HasValue)
                {
                    predicate = predicate.And(p => p.ProductColors
                    .Select(p => p.Price).Min() >= searchParams.MinPrice.Value);
                }

                //Фільтрація за країною виробника
                if (searchParams.ManufacturerCountries.Any())
                {
                    predicate = predicate.And(p => searchParams
                    .ManufacturerCountries.Contains(p.ManufacturerCountryId ?? default(int)));
                }

                //Фільтрація за виробником
                if (searchParams.Manufacturers.Any())
                {
                    predicate = predicate.And(p => searchParams
                    .Manufacturers.Contains(p.ManufacturerId ?? default(int)));
                }

                //Фільтрація за набором динамічних характеристик
                if (searchParams.Descriptions.Any())
                {
                    foreach (var description in searchParams.Descriptions)
                    {
                        int descId = await db.Descriptions.Where(d => d.Name == description.Name
                            && d.CategoryId == searchParams.Category)
                           .Select(d => d.Id).FirstOrDefaultAsync();

                        predicate.And(p => description.Abouts.Contains(db.ProductDescriptions.Where(pd => pd.DescriptionId == descId
                        && pd.ProductId == p.Id).Select(pd => pd.About).FirstOrDefault()));
                    }
                }

                //Тільки продукти зі знижкою
                if (searchParams.WithDiscount.Equals(true))
                {
                    IQueryable<int> productsWithSales = db.Sales.Select(s => s.ProductId);
                    var sales = await productsWithSales.ToListAsync();
                    predicate = predicate.And(p => sales.Contains(p.Id));
                }

                //Тільки продукти без знижки
                if (searchParams.WithDiscount.Equals(false))
                {
                    IQueryable<int> productsWithoutSales = db.Sales.Select(s => s.ProductId);
                    var sales = await productsWithoutSales.ToListAsync();
                    predicate = predicate.And(p => !sales.Contains(p.Id));
                }

                query = query.Include(o => o.ProductPictures)
                    .Include(o => o.ProductColors)
                    .Include(o => o.ProductDescriptions)
                    .Include(o => o.Manufacturer)
                    .Include(o => o.ManufacturerCountry);

                //Виконання предикату
                query = query.Where(predicate);

                var totalCount = query.Count();

                query = query.Skip((searchParams.Page.Value - 1) * searchParams.Limit.Value)
                    .Take(searchParams.Limit.Value);

                //Всіх продуктів для повернення
                var totalCountFromPage = await query.CountAsync();

                //Перетворення query в список
                var products = await query.ToListAsync();

                //Формування пагінованого списку
                PaginatedList<Product> paginatedList = new PaginatedList<Product>
                {
                    Items = products,
                    TotalCountFromPage = totalCountFromPage,
                    TotalCount = totalCount
                };

                return paginatedList;
            }
            catch (ArgumentNullException ex)
            {
                throw new ArgumentNullException(nameof(searchParamsModel) + " null категорія");
            }
        }

        public override async Task<Product> GetAsync(int id)
        {
            return await db.Products
                .Include(o => o.ManufacturerCountry)
                .Include(o => o.Manufacturer)
                .Include(o => o.Category)
                .Include(o => o.Reviews)
                .Include(o => o.ProductDescriptions)
                .Include(o => o.ProductPictures)
                .Include(o => o.ProductColors)
                .FirstOrDefaultAsync(o => o.Id == id);
        }

        public override async Task<IEnumerable<Product>> GetAllAsync()
        {
            return await db.Products
                .Include(o => o.ProductPictures)
                .Include(o => o.ProductColors).ToListAsync();
        }
    }
}
