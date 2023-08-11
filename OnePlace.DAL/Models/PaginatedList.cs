namespace OnePlace.DAL.Models
{
    public class PaginatedList<T>
    {
        public List<T> Items { get; set; } = new List<T>();
        public int Total { get; set; } = 0;
    }
}
