namespace OnePlace.BOL.CategoryDTO
{
    public class CategoryDetails
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        
        public int? ParentId { get; set; }
        public List<CategoryDetails>? ChildrenCategories { get; set; }
        public List<CategoryDetails>? ParentCategories { get; set; }
        



        //public CategoryDetails? ParentCategory { get; set; }
    }
}
