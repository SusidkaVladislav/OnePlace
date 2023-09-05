using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OnePlace.BOL.Picture
{
    public class UserPicturePayload
    {
        [Required]
        [DataType(DataType.Text)]
        public string PictureAddress { get; set; }
    }
}
