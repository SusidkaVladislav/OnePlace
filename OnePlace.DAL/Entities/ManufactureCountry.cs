namespace OnePlace.DAL.Entities
{
    public class ManufactureCountry
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public ICollection<Product> Products { get; set; } = new List<Product>();
    }
}
