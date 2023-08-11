using Microsoft.EntityFrameworkCore;

namespace OnePlace.DAL.Entities
{
    //[PrimaryKey(nameof(DescriptionId), nameof(ProductId))]
    public class ProductDescription
    {
        public int DescriptionId { get; set; }
        [DeleteBehavior(DeleteBehavior.NoAction)]
        public Description Description { get; set; }
        public int ProductId { get; set; }
        [DeleteBehavior(DeleteBehavior.NoAction)]
        public Product Product { get; set; }
        public string About { get; set; }
    }
}
