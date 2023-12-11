namespace OnePlace.DAL.Entities
{
    public class Product
    {
        public int Id { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int? ManufacturerCountryId { get; set; }
        public ManufactureCountry ManufacturerCountry { get; set; }
        public int? ManufacturerId { get; set; }
        public Manufacturer Manufacturer { get; set; }
        public int CategoryId { get; set; }
        public Category Category { get; set; }
        public bool IsInBestProducts { get; set; }
        public ICollection<Review> Reviews { get; set; } = new List<Review>();
        public ICollection<ProductDescription> ProductDescriptions { get; set; } = new List<ProductDescription>();
        public ICollection<ProductPicture> ProductPictures { get; set; } = new List<ProductPicture>();
        public ICollection<ProductColor> ProductColors { get; set; } = new List<ProductColor>();

    }
}
