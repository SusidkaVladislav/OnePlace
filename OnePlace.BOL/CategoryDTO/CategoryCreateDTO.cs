namespace OnePlace.BOL.CategoryDTO
{
    public class CategoryCreateDTO
    {
        public string Name { get; set; } = string.Empty;
        public int? ParentId { get; set; }
    }
}
