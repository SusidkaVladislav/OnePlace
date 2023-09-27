using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using OnePlace.BLL.Interfaces;
using OnePlace.BLL.Validators;
using OnePlace.BOL;
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

        public async Task<int> AddReviewReply(ReviewReplyPayload reviewReplyPayload)
        {
            ReviewReply reviewReply = _mapper.Map<ReviewReply>(reviewReplyPayload);

            var review = await _unitOfWork.Reviews.GetAsync(reviewReply.ReviewId);
            if (review is null)
                throw new ArgumentException("review with this id does not exist");

            _unitOfWork.ReviewReplies.Create(reviewReply);
            await _unitOfWork.SaveAsync();

            return reviewReply.ReviewId;
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

        public async Task<int> DeleteReview(int id)
        {
            if (id <= 0)
                throw new ArgumentNullException(nameof(id) + " некоректний ID");

            var review = await _unitOfWork.Reviews.GetAsync(id);
            if (review is null)
                throw new NotFoundException(nameof(review) + " review with this id does not exist");
          
            await _unitOfWork.ReviewReplies.DeleteAsync(id);
            await _unitOfWork.Reviews.DeleteAsync(id);
            await _unitOfWork.SaveAsync();

            return id;
        }

        public async Task<int> DeleteReviewReply(int id)
        {
            if (id <= 0)
                throw new ArgumentNullException(nameof(id) + " некоректний ID");

            var reviewReply = await _unitOfWork.ReviewReplies.GetAsync(id);
            if (reviewReply is null)
                throw new NotFoundException(nameof(reviewReply) + " reviewReply with this id does not exist");

            await _unitOfWork.ReviewReplies.DeleteAsync(id);
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

        public async Task<IEnumerable<MessageDTO>> GetMessages()
        {
            var messages = await _unitOfWork.Messages.GetAllAsync();

            List<MessageDTO> messagesDTO = new List<MessageDTO>();
            foreach (var message in messages)
            {
                MessageDTO messageDTO = _mapper.Map<MessageDTO>(message);
                IEnumerable<ProductPicture> productPictures = await _unitOfWork.ProductPictures
                    .FindAsync(p => p.ProductId == message.ProductId && p.IsTitle == true);

                messageDTO.ProductPictureAddress = productPictures.FirstOrDefault().Picture.Address;
                messagesDTO.Add(messageDTO);
            }
           
            return messagesDTO;
        }

        public async Task<IEnumerable<Order>> GetOrders()
        {
            var orders = await _unitOfWork.Orders.GetAllAsync();
            return orders;
        }

        public async Task<Review> GetReview(int id)
        {
            var review = await _unitOfWork.Reviews.GetAsync(id);
            return review;
        }

        public async Task<IEnumerable<ReviewReply>> GetReviewReplies()
        {
            var reviewReplies = await _unitOfWork.ReviewReplies.GetAllAsync();
            return reviewReplies;
        }

        public async Task<ReviewReply> GetReviewReply(int id)
        {
            var reviewReply = await _unitOfWork.ReviewReplies.GetAsync(id);
            return reviewReply;
        }

        public async Task<IEnumerable<Review>> GetReviews()
        {
            var reviews = await _unitOfWork.Reviews.GetAllAsync();
            return reviews;
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
