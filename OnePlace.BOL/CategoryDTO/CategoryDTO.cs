namespace OnePlace.BOL.CategoryDTO
{
    public class CategoryDTO
    {
        public int Id { get; set; }
        
        public string Name { get; set; }

        public string PictureAddress { get; set; }

        public int? ParentId { get; set; }
    }
}
