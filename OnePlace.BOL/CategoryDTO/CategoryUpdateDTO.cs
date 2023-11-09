namespace OnePlace.BOL.CategoryDTO
{
    public class CategoryUpdateDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string? PictureURL { get; set; }
        public string? DeletePictureURL { get; set; }

    }
}
