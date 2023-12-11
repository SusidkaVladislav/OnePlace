using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using OnePlace.BOL.Exceptions;
using OnePlace.DAL.Entities;

namespace OnePlace.BLL.Validators
{
    public class UserValidation
    {
        private readonly UserManager<User> _userManager;

        public UserValidation(UserManager<User> userManager)
        {
            _userManager = userManager;
        }

        public async Task Validate(User user)
        {
            await EmailValid(user.Email);
            await PhoneValid(user.PhoneNumber);
        }

        public async Task EmailValid(string email)
        {
            if (string.IsNullOrEmpty(email))
                throw new ArgumentNullException(nameof(email) + " is null or empty");
            User? user = await _userManager.FindByEmailAsync(email);
            if (user != null)
                throw new BusinessException("Користувач з такою електронною адресою уже існує!");
        }

        public async Task PhoneValid(string phoneNumber)
        {
            if (string.IsNullOrEmpty(phoneNumber))
                throw new ArgumentNullException("Некоректний телефон!");
            User? user = await _userManager.Users
                .Where(u => u.PhoneNumber == phoneNumber).FirstOrDefaultAsync();

            if (user != null)
                throw new BusinessException("Користувач з таким номером телефону уже існує!");
        }
    }
}
