using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OnePlace.DAL.Entities
{
    internal class ProductPicture
    {
        public int ProductId { get; set; }
        public Product Product { get; set; }
        public int PictureId { get; set; }
        public Picture Picture { get; set; }
        public bool IsTitle { get;set; }
    }
}
