namespace OnePlace.DAL.Entities
{
    public class ProductPicture
    {
        public int ProductId { get; set; }
        public Product Product { get; set; }
        public int PictureId { get; set; }
        public Picture Picture { get; set; }
        public bool IsTitle { get;set; }
    }
}
