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
    }
}
