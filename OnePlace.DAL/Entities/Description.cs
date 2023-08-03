namespace OnePlace.DAL.Entities
{
    public class Description
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int CategoryId { get; set; }
        public Category Category { get; set; }  
    }
}
