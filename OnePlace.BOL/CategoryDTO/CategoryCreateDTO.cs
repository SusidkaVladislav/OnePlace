namespace OnePlace.BOL.CategoryDTO
{
    public class CategoryCreateDTO
    {
        public string Name { get; set; }

        public string PictureAddress { get; set; }
        
        public int? ParentId { get; set; }
    }
}
