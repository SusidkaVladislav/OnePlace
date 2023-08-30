namespace OnePlace.BOL.ProductDTO
{
    public abstract class BaseProduct
    {
        public string Code { get; set; }
        public string Name { get; set; }
        public int ManufacturerCountryId { get; set; }
        public int ManufacturerId { get; set; }
        public bool IsInBestProducts { get; set; } = false;
        public string Description { get; set; }
    }
}
