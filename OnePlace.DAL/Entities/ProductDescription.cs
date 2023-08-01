using Microsoft.EntityFrameworkCore;

namespace OnePlace.DAL.Entities
{
    [PrimaryKey(nameof(DescriptionId), nameof(ProductId))]
    public class ProductDescription
    {
        public int DescriptionId { get; set; }
        public Description Description { get; set; }
        public int ProductId { get; set; }
        public Product Product { get; set; }
        public string About { get; set; }
    }
}
