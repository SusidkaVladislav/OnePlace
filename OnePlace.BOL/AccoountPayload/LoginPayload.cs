using System.ComponentModel.DataAnnotations;

namespace OnePlace.BOL.AccoountPayload
{
    public class LoginPayload
    {
        [Required]
        [DataType(DataType.EmailAddress)]
        [Display(Name = "Електронна адреса")]
        public string Email { get; set; }

        [Required]
        [DataType(DataType.Password)]
        [Display(Name = "Пароль")]
        public string Password { get; set; }

        [Display(Name = "Запам'ятати мене?")]
        public bool RememberMe { get; set; }
    }
}
