using OnePlace.BOL.Message;
using OnePlace.BOL.OrderPayload;
using OnePlace.BOL.User;
using OnePlace.DAL.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OnePlace.BLL.Interfaces
{
    public interface IAdminService
    {
        Task<IEnumerable<Order>> GetOrders();
        Task<int> UpdateOrder(UpdateOrderPayload order);
        Task<int> DeleteOrder(int id);
        Task<IEnumerable<Message>> GetMessages();
        Task<int> UpdateMessage(UpdateMessagePayload message);
        Task<int> DeleteMessage(int id);
        Task<IEnumerable<PureUser>> GetUsers();
        Task<int> DeleteUser(int id);
    }
}
