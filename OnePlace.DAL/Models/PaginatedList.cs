namespace OnePlace.DAL.Models
{
    public class PaginatedList<T>
    {
        public List<T> Items { get; set; } = new List<T>();
        public int TotalCountFromPage { get; set; } = 0;
        public int TotalCount { get; set; } = 0;
    }
}
