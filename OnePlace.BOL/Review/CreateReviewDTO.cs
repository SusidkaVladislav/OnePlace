using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OnePlace.BOL.Review
{
    public class CreateReviewDTO
    {
        public int NumberOfStars { get; set; }
        public string Comment { get; set; }
        //public DateTime Date { get; set; }
        public int ProductId { get; set; }
    }
}
