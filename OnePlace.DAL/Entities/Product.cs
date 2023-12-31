﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OnePlace.DAL.Entities
{
    internal class Product
    {
        public int Id { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }
        public float Price { get; set; }
        public string Description { get; set; }
        public int ManufactureCountryId { get; set; }
        public ManufactureCountry ManufactureCountry { get; set; } 
        public int ManufacturerId { get; set; }
        public Manufacturer Manufacturer { get; set;}
        public int MaterialId { get; set; }
        public Material Material { get; set; }
        public int ColorId { get; set; }
        public Color Color { get; set; }
        public int GenderId { get; set; }
        public Gender Gender { get; set; }
        public int CategoryId { get; set; }
        public Category Category { get; set; }
        public bool IsInBestProducts { get; set; }

    }
}
