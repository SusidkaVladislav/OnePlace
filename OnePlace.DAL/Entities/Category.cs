using Microsoft.Identity.Client;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OnePlace.DAL.Entities
{
    public class Category
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int? ParentCategoryId { get; set; }
        public Category ParentCategory { get; set; }
        public string PictureAddress { get; set; }
        public ICollection<Category> ChildCategories { get; set; }
        public ICollection<Product> Products { get; set; }
        public ICollection<Description> Descriptions { get; set; }
    }
}
