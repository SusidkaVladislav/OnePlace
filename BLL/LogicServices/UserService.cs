using BLL.Interfaces;
using DTO.User;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.LogicServices
{
    public class UserService : IUserService
    {
        //Dependency injection of repository


        public async Task<UserDTO> AddUserAsync(UserToAddDTO userToAdd)
        {
            throw new NotImplementedException();
        }

        public async Task DeleteUserAsync(long id)
        {
            throw new NotImplementedException();
        }

        public async Task<UserDTO> GetUserByIdAsync(long id)
        {
            throw new NotImplementedException();
        }

        public async Task<List<UserDTO>> GetUsersAsync()
        {
            throw new NotImplementedException();
        }

        public async Task<UserDTO> UpdateUserAsync(UserDTO userDTO)
        {
            throw new NotImplementedException();
        }
    }
}
