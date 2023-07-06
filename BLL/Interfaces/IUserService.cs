using DTO.Description;
using DTO.User;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Interfaces
{
    public interface IUserService
    {
        Task<List<UserDTO>> GetUsersAsync();
        Task<UserDTO> GetUserByIdAsync(long id);
        Task<UserDTO> AddUserAsync(UserToAddDTO userToAdd);
        Task<UserDTO> UpdateUserAsync(UserDTO userDTO);
        Task DeleteUserAsync(long id);
    }
}