using OnePlace.DAL.Entities;
using OnePlace.DAL.Models;
using OnePlace.DAL.SearchParams;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OnePlace.DAL.Interfaces
{
    public interface IRepository<T, TKey> where T : class
    {
        Task<IEnumerable<T>> GetAllAsync();
        Task<T> GetAsync(TKey key);
        Task<IEnumerable<T>> FindAsync(Func<T, Boolean> predicate);
        void Create(T item);
        void Update(T item);
        Task DeleteAsync(TKey key);
        Task<PaginatedList<T>> Filter<S>(S searchParamsModel) where S : BaseSearchParams;
    }
}
