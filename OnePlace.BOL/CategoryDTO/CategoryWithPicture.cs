namespace OnePlace.BOL.CategoryDTO
{
    public class CategoryWithPicture
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int? ParentCategoryId { get; set; }
        public string? PictureURL { get; set; }
    }
}
