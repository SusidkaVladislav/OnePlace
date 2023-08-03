using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OnePlace.DAL.Interfaces
{
    public interface IRepository<T, TKey> where T : class
    {
        IEnumerable<T> GetAll();
        T Get(TKey key);
        IEnumerable<T> Find(Func<T, Boolean> predicate);
        void Create(T item);
        void Update(T item);
        void Delete(TKey key);
    }
}
