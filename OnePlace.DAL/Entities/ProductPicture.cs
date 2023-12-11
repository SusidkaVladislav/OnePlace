using Microsoft.EntityFrameworkCore;

namespace OnePlace.DAL.Entities
{
    public class ProductPicture
    {
        public int ProductId { get; set; }

        [DeleteBehavior(DeleteBehavior.NoAction)]
        public Product Product { get; set; }

        public int PictureId { get; set; }

        [DeleteBehavior(DeleteBehavior.NoAction)]
        public Picture Picture { get; set; }

        public bool IsTitle { get; set; }
    }
}
