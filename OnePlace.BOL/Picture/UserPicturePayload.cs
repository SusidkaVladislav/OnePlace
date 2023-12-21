using System.ComponentModel.DataAnnotations;

namespace OnePlace.BOL.Picture
{
    public class UserPicturePayload
    {
        [Required]
        [DataType(DataType.Text)]
        public string PictureAddress { get; set; }
    }
}
