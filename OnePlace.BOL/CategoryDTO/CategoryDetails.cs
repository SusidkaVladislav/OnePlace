namespace OnePlace.BOL.CategoryDTO
{
    public class CategoryDetails
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int? ParentId { get; set; }
        public List<PureCategory>? ChildrenCategories { get; set; }
        //public List<CategoryDetails>? ParentCategories { get; set; }
    }
}
