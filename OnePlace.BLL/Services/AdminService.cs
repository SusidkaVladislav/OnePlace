using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using OnePlace.BLL.Interfaces;
using OnePlace.BOL.CategoryDTO;
using OnePlace.BOL.Exceptions;
using OnePlace.BOL.Message;
using OnePlace.BOL.OrderPayload;
using OnePlace.BOL.User;
using OnePlace.DAL.Entities;
using OnePlace.DAL.Enums;
using OnePlace.DAL.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OnePlace.BLL.Services
{
    public class AdminService : IAdminService
    {
        private readonly IMapper _mapper;
        private readonly IConfiguration _configuration;
        private IUnitOfWork _unitOfWork;
        private readonly UserManager<User> _userManager;
        public AdminService(IMapper mapper, 
            IConfiguration configuration, 
            IUnitOfWork unitOfWork,
            UserManager<User> userManager)
        {
            _mapper = mapper;
            _configuration = configuration;
            _unitOfWork = unitOfWork;
            _userManager = userManager;
        }

        public async Task<int> DeleteMessage(int id)
        {
            if (id <= 0)
                throw new ArgumentNullException(nameof(id) + " некоректний ID");

            var message = await _unitOfWork.Messages.GetAsync(id);

            if (message is null)
                throw new NotFoundException(nameof(message) + " message with this id does not exist");

            await _unitOfWork.Messages.DeleteAsync(id);
            await _unitOfWork.SaveAsync();

            return id;
        }

        public async Task<int> DeleteOrder(int id)
        {
            if (id <= 0)
                throw new ArgumentNullException(nameof(id) + " некоректний ID");

            var order = await _unitOfWork.Orders.GetAsync(id);

            if (order is null)
                throw new NotFoundException(nameof(order) + " order with this id does not exist");

            foreach (var orderProduct in order.OrderProducts)
            {
                Composite3Key key = new Composite3Key
                {
                    Column1 = orderProduct.OrderId,
                    Column2 = orderProduct.ProductId,
                    Column3 = orderProduct.ColorId
                };
                await _unitOfWork.OrderProducts.DeleteAsync(key);

            }
           
            await _unitOfWork.Orders.DeleteAsync(id);
            await _unitOfWork.SaveAsync();

            return id;
        }

        public async Task<int> DeleteUser(int id)
        {
            if (id <= 0)
                throw new ArgumentNullException(nameof(id) + " некоректний ID");

            var user = await _unitOfWork.Users.GetAsync(id);

            if (user is null)
                throw new NotFoundException(nameof(user) + " user with this id does not exist");

            await _unitOfWork.Users.DeleteAsync(id);
            await _unitOfWork.SaveAsync();

            return id;
        }

        public async Task<IEnumerable<Message>> GetMessages()
        {
            var messages = await _unitOfWork.Messages.GetAllAsync();
            return messages;
        }

        public async Task<IEnumerable<Order>> GetOrders()
        {
            var orders = await _unitOfWork.Orders.GetAllAsync();
            return orders;
        }

        public async Task<IEnumerable<PureUser>> GetUsers()
        {
            var users = await _unitOfWork.Users.GetAllAsync();
            IEnumerable<PureUser> res = _mapper.Map<IEnumerable<PureUser>>(users);

            foreach (var user in res)
            {
                user.CountOfOrders = _unitOfWork.Orders.FindAsync(o => o.UserId == user.Id).Result.Count();
            }

            return res;
        }

        public async Task<int> UpdateMessage(UpdateMessagePayload messagePayload)
        {
            if (messagePayload.Id <= 0)
                throw new ArgumentNullException(nameof(messagePayload.Id) + " некоректний ID");

            var message = await _unitOfWork.Messages.GetAsync(messagePayload.Id);

            if (message is null)
                throw new NotFoundException(nameof(message) + " message with this id does not exist");

            message.IsReplied = messagePayload.IsReplied;
            _unitOfWork.Messages.Update(message);
            await _unitOfWork.SaveAsync();

            return messagePayload.Id;
        }

        public async Task<int> UpdateOrder(UpdateOrderPayload orderPayload)
        {
            if (orderPayload.Id <= 0)
                throw new ArgumentNullException(nameof(orderPayload.Id) + " некоректний ID");

            var order = await _unitOfWork.Orders.GetAsync(orderPayload.Id);

            if (order is null)
                throw new NotFoundException(nameof(order) + " order with this id does not exist");

            OrderState state;
            if (Enum.TryParse<OrderState>(orderPayload.State, true, out state) == false)
                throw new ArgumentException("could not parse passed order state to enum");

            order.State = state;
            _unitOfWork.Orders.Update(order);
            await _unitOfWork.SaveAsync();

            return orderPayload.Id;
        }
    }
}
