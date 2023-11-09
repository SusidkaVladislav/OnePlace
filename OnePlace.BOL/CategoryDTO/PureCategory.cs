namespace OnePlace.BOL.CategoryDTO
{
    public class PureCategory
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string PictureURL { get; set; }
        public string DeletePictureURL { get; set; }

        public bool HasProducts { get; set; }
    }
}
