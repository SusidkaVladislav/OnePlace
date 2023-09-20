using System.ComponentModel.DataAnnotations;

namespace OnePlace.BOL.AccoountPayload
{
    public class RegisterPayload
    {
        [Required]
        [Display(Name = "Ім'я")]
        public string Name { get; set; }
        [Required]
        [Display(Name = "Прізвище")]
        public string Surname { get; set; }

        [Required]
        [DataType(DataType.PhoneNumber)]
        [Display(Name = "Номер телефону")]
        public string PhoneNumber { get; set; }

        [Required]
        [Display(Name = "улуктронна адреса")]
        public string Email { get; set; }

        [Required]
        [DataType(DataType.Password)]
        [Display(Name = "Пароль")]
        public string Password { get; set; }
    }
}
