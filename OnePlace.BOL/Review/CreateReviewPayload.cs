using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Diagnostics.CodeAnalysis;

namespace OnePlace.BOL.Review
{
    public class CreateReviewPayload
    {
        [Required]
        [Range(1, 5)]
        public int NumberOfStars { get; set; }
        [AllowNull]
        [DataType(DataType.Text)]
        public string Comment { get; set; }
        //[Required]
        //[DataType(DataType.DateTime)]
        //public DateTime Date { get; set; }
        [Required]
        public int ProductId { get; set; }
    }
}
