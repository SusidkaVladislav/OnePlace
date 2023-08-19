namespace OnePlace.DAL.Entities
{
    public class Product
    {
        public int Id { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }
        public decimal Price { get; set; }
        public string Description { get; set; }
        public int? ManufacturerCountryId { get; set; }
        public ManufactureCountry ManufacturerCountry { get; set; } 
        public int? ManufacturerId { get; set; }
        public Manufacturer Manufacturer { get; set;}
        public int? MaterialId { get; set; }
        public Material Material { get; set; }
        public int? ColorId { get; set; }
        public Color Color { get; set; }
        public int? GenderId { get; set; }
        public Gender Gender { get; set; }
        public int CategoryId { get; set; }
        public Category Category { get; set; }
        public bool IsInBestProducts { get; set; }
        public ICollection<Review> Reviews { get; set; } = new List<Review>();
        public ICollection<ProductDescription> ProductDescriptions { get; set; } = new List<ProductDescription>();
        public ICollection<ProductPicture> ProductPictures { get; set; } = new List<ProductPicture>();

    }
}
