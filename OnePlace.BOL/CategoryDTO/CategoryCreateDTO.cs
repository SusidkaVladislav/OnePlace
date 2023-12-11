namespace OnePlace.BOL.CategoryDTO
{
    public class CategoryCreateDTO
    {
        public string Name { get; set; }

        public string? PictureURL { get; set; }

        public string? DeletePictureURL { get; set; }

        public int? ParentId { get; set; }
    }
}
