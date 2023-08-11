using OnePlace.DAL.EF;
using OnePlace.DAL.Entities;
using OnePlace.DAL.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using OnePlace.DAL.SearchParams;
using LinqKit;
using OnePlace.DAL.Models;

namespace OnePlace.DAL.Repositories
{
    public class ProductRepository : RepositoryBase<Product, int>
    {
        public ProductRepository(AppDbContext context): base(context) { }


        public override async Task DeleteAsync(int id)
        {
            Product product = await db.Products.FirstOrDefaultAsync(o => o.Id == id);
            if (product != null)
            {
                db.Products.Remove(product);
            }
        }

        public override async Task<IEnumerable<Product>> FindAsync(Func<Product, bool> predicate)
        {
            return //await db.Products.Where(p=> p.Id == 0).FirstOrDefaultAsync(); 
                await GetListAsync(predicate);
        }

        private Task<List<Product>> GetListAsync(Func<Product, bool> predicate)
        {
            return Task.Run(() => db.Products
                .Include(o => o.ManufacturerCountry)
                .Include(o => o.Manufacturer)
                .Include(o => o.Material)
                .Include(o => o.Color)
                .Include(o => o.Gender)
                .Include(o => o.Category)
                .Include(o => o.Reviews)
                .Include(o => o.ProductDescriptions)
                .Include(o => o.ProductPictures)
                .Where(predicate).ToList());
        }

        public override async Task<PaginatedList<Product>> Filter<T>(T searchParamsModel) 
        {
            var searchParams = searchParamsModel as ProductSearchParams;

            IQueryable<Product> query = db.Products.AsNoTracking();
            var predicate = PredicateBuilder.New<Product>();
            
            if(searchParams.Colors.Any()) 
            {
                predicate = predicate.And(p => searchParams.Colors.Contains(p.ColorId ?? default(int)));
            }
            if (searchParams.MaxPrice.HasValue)
            {
                predicate = predicate.And(p => p.Price <= (decimal)searchParams.MaxPrice.Value);
            }
            if (searchParams.MinPrice.HasValue)
            {
                predicate = predicate.And(p=> p.Price >= (decimal)searchParams.MinPrice.Value);
            }
            if (searchParams.Genders.Any())
            {
                predicate = predicate.And(p=> searchParams.Genders.Contains(p.GenderId ?? default(int)));
            }
            if (searchParams.ManufacturerCountries.Any())
            {
                predicate = predicate.And(p=>searchParams.ManufacturerCountries.Contains(p.ManufacturerCountryId ?? default(int)));
            }
            if (searchParams.Manufacturers.Any())
            {
                predicate = predicate.And(p => searchParams.Manufacturers.Contains(p.ManufacturerId ?? default(int)));
            }
            if(searchParams.Category.HasValue)
            {
                predicate = predicate.And(p => p.CategoryId == searchParams.Category);
            }
            //if (searchParams.Descriptions.Any())
            //{
            //    foreach (var description in searchParams.Descriptions)
            //    {
            //        predicate.And(p => p.ProductDescriptions)
            //    }
            //}
            if(searchParams.WithDiscount.Equals(true))
            {
                IQueryable<int> productsWithSales = db.Sales.Select(s => s.ProductId);//.Skip(searchParams.Page.Value).Take(searchParams.Limit.Value);
                var l = await productsWithSales.ToListAsync();
                predicate = predicate.And(p => l.Contains(p.Id));
            }
            if (searchParams.WithDiscount.Equals(false))
            {

            }

            query = query.Include(o => o.ManufacturerCountry)
                .Include(o => o.Manufacturer)
                .Include(o => o.Material)
                .Include(o => o.Color)
                .Include(o => o.Gender)
                .Include(o => o.Category)
                .Include(o => o.Reviews)
                .Include(o => o.ProductDescriptions)
                .Include(o => o.ProductPictures);

            query = query.Where(predicate);

            var totalCount = await query.CountAsync();
            //if (searchParams.Page.HasValue)
            //{
            //    query = query.Skip(searchParams.Page.Value);
            //}
            //if (searchParams.Limit.HasValue)
            //{
            //    query = query.Take(searchParams.Limit.Value);
            //}

            var products = await query.ToListAsync();

            PaginatedList<Product> paginatedList = new PaginatedList<Product>
            {
                Items = products,
                Total = totalCount
            };

            return paginatedList;
        }

        public override async Task<Product> GetAsync(int id)
        {
            return await db.Products
                .Include(o => o.ManufacturerCountry)
                .Include(o => o.Manufacturer)
                .Include(o => o.Material)
                .Include(o => o.Color)
                .Include(o => o.Gender)
                .Include(o => o.Category)
                .Include(o => o.Reviews)
                .Include(o => o.ProductDescriptions)
                .Include(o => o.ProductPictures)
                .FirstOrDefaultAsync(o => o.Id == id);
        }

        public override async Task<IEnumerable<Product>> GetAllAsync()
        {
            return await db.Products.Include(o => o.ProductPictures).ToListAsync();
        }
    }
}
