using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OnePlace.DAL.Entities
{
    public class Delivery
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int PictureId { get; set; }
        public Picture Picture { get; set; } 
    }
}
