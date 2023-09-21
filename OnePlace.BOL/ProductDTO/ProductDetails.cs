﻿using OnePlace.BOL.CategoryDTO;
using OnePlace.BOL.Description;
using OnePlace.BOL.Picture;
using OnePlace.BOL.ProductColor;
using OnePlace.BOL.Sale;


namespace OnePlace.BOL.ProductDTO
{
    public class ProductDetails
    {
        public int Id { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }
        public decimal Price { get; set; }
        public string Description { get; set; }
        public int? ManufacturerCountryId { get; set; }
        public ManufacturerCountryDTO? ManufacturerCountry { get; set; }
        public int? ManufacturerId { get; set; }
        public ManufacturerDTO? Manufacturer { get; set; }
        public int CategoryId { get; set; }
        public CategoryDetails Category { get; set; }
        public bool IsInBestProducts { get; set; }
        public SaleDetails? Sale { get; set; }
        public List<ProductDescriptionDetails> Descriptions { get; set; }
        public List<ProductPictureDetails> Pictures { get; set; }
        public List<ProductColorDetails> ProductColors { get; set; }
    }
}