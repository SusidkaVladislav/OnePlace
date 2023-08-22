namespace OnePlace.DAL.Entities
{
    //[PrimaryKey(nameof(ProductId), nameof(PictureId))]
    public class ProductPicture
    {
        public int ProductId { get; set; }
        public Product Product { get; set; }
        public string PictureAddress { get; set; }
        public bool IsTitle { get;set; }
    }
}
