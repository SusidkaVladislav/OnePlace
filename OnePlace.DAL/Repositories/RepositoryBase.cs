using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using OnePlace.DAL.EF;
using OnePlace.DAL.Entities;
using OnePlace.DAL.Interfaces;
using OnePlace.DAL.Models;
using OnePlace.DAL.SearchParams;

namespace OnePlace.DAL.Repositories
{
    public abstract class RepositoryBase<T, TKey> : IRepository<T, TKey> where T : class //where TKey : struct
    {

        protected AppDbContext db;
        protected readonly UserManager<User> _userManager;
        public RepositoryBase(AppDbContext context, UserManager<User> userManager)
        {
            db = context;
            _userManager = userManager;
        }

        public void Create(T item)
        {
           db.Set<T>().Add(item);
        }

        public virtual Task DeleteAsync(TKey key)
        {
            throw new NotImplementedException();
        }

        public virtual Task<PaginatedList<T>> Filter<S>(S searchParamsModel) where S : BaseSearchParams
        {
            throw new NotImplementedException();
        }

        public virtual async Task<IEnumerable<T>> FindAsync(Func<T, bool> predicate)
        {
            throw new NotImplementedException();
        }

        public virtual async Task<IEnumerable<T>> GetAllAsync()
        {
            return await db.Set<T>().ToListAsync();
        }

        public virtual async Task<T> GetAsync(TKey key)
        {
            throw new NotImplementedException();
        }

        public void Update(T item)
        {
            db.Entry(item).State = (Microsoft.EntityFrameworkCore.EntityState)EntityState.Modified;
        }
    }
}
