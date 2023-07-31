using System.ComponentModel.DataAnnotations;

namespace OnePlace.DAL.Entities.ViewModels
{
    public class Login
    {
        [Required]
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
