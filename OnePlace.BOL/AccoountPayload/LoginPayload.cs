using System.ComponentModel.DataAnnotations;

namespace OnePlace.BOL.AccoountPayload
{
    public class LoginPayload
    {
        [Required]
        [DataType(DataType.EmailAddress)]
        public string Email { get; set; }

        [Required]
        [DataType(DataType.Password)]
        public string Password { get; set; }

        //public bool RememberMe { get; set; }
    }
}
