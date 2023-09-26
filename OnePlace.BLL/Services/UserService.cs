using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using OnePlace.BLL.Interfaces;
using OnePlace.BLL.Validators;
using OnePlace.BOL.CategoryDTO;
using OnePlace.BOL.Exceptions;
using OnePlace.BOL.Message;
using OnePlace.BOL.Password;
using OnePlace.BOL.Picture;
using OnePlace.BOL.Review;
using OnePlace.BOL.ShoppingCart;
using OnePlace.DAL.Entities;
using OnePlace.DAL.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OnePlace.BLL.Services
{
    /// <summary>
    /// Сервіс для роботи з користувацьким інтерфейсом
    /// </summary>
    public class UserService : IUserService
    {
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private IHttpContextAccessor _httpContextAccessor;

        public UserService(IMapper mapper,
           IUnitOfWork unitOfWork,
            UserManager<User> userManager,
           SignInManager<User> signInManager,
           IHttpContextAccessor httpContextAccessor)
        {
            _mapper = mapper;
            _unitOfWork = unitOfWork;
            _userManager = userManager;
            _signInManager = signInManager;
            _httpContextAccessor = httpContextAccessor;
        }

        public async Task<int> AddLikedProduct(int productId)
        {
            var product = await _unitOfWork.Products.GetAsync(productId);
            if (product == null){
                throw new ArgumentException("product with this id does not exist");
            }

            var user = await _userManager.GetUserAsync(_httpContextAccessor.HttpContext.User);
            LikedProduct likedProduct = new LikedProduct { ProductId = productId, UserId = user.Id };
            _unitOfWork.LikedProducts.Create(likedProduct);

            await _unitOfWork.SaveAsync();

            return productId;
        }

        public async Task<int> AddMessage(MessagePayload messagePayload)
        {
            var product = await _unitOfWork.Products.GetAsync(messagePayload.ProductId);
            if (product == null)
            {
                throw new ArgumentException("product with this id does not exist");
            }

            Message message = _mapper.Map<Message>(messagePayload);

            var user = await _userManager.GetUserAsync(_httpContextAccessor.HttpContext.User);
            if(user != null)
            {
                message.UserId = user.Id;
            }
           
            _unitOfWork.Messages.Create(message);
            await _unitOfWork.SaveAsync();

            return messagePayload.ProductId;
        }

        public async Task<int> AddToCart(ShoppingCartPayload cartPayload)
        {
            ShoppingCartDTO shoppingCartDTO = _mapper.Map<ShoppingCartDTO>(cartPayload);
            var user = await _userManager.GetUserAsync(_httpContextAccessor.HttpContext.User);
            ShoppingCart entry = await _unitOfWork.ShoppingCarts.GetAsync(
                new Composite3Key { 
                    Column1 = shoppingCartDTO.ProductId, 
                    Column2 = user.Id, 
                    Column3 = shoppingCartDTO.ColorId });

            if(entry != null) {
                entry.Quantity += shoppingCartDTO.Quantity;
                _unitOfWork.ShoppingCarts.Update(entry);
                await _unitOfWork.SaveAsync();
                return entry.ProductId;
            }

            ShoppingCart cart = _mapper.Map<ShoppingCart>(shoppingCartDTO);
            cart.UserId = user.Id;
            _unitOfWork.ShoppingCarts.Create(cart);
            await _unitOfWork.SaveAsync();
            return cart.ProductId;
        }

        async public Task<int> CreateReview(CreateReviewPayload reviewPayload)
        {
            CreateReviewDTO reviewDTO = _mapper.Map<CreateReviewDTO>(reviewPayload);

            ReviewValidation validation = new ReviewValidation(_unitOfWork);

            if (reviewDTO == null)
                throw new NotFoundException(nameof(CreateReviewDTO) + " переданий об'єкт рівний null");

            Review review = _mapper.Map<Review>(reviewDTO);
            var user = await _userManager.GetUserAsync(_httpContextAccessor.HttpContext.User);
            
            review.UserId = user.Id;

            _unitOfWork.Reviews.Create(review);

            await _unitOfWork.SaveAsync();

            return review.Id;
        }

        public async Task<int> DeleteFromCart(ShoppingCartPayload cartPayload)
        {
            var user = await _userManager.GetUserAsync(_httpContextAccessor.HttpContext.User);
            var cart = await _unitOfWork.ShoppingCarts.GetAsync(
                 new Composite3Key
                 {
                     Column1 = cartPayload.ProductId,
                     Column2 = user.Id,
                     Column3 = cartPayload.ColorId
                 });

            if (cart == null)
            {
                throw new ArgumentException("cart entity with this composite key does not exist");
            }

            await _unitOfWork.ShoppingCarts.DeleteAsync(
                new Composite3Key
                {
                    Column1 = cartPayload.ProductId,
                    Column2 = user.Id,
                    Column3 = cartPayload.ColorId
                });
            await _unitOfWork.SaveAsync();
            return cartPayload.ProductId;
        }

        public async Task<int> DeleteLikedProduct(int productId)
        {
            var product = await _unitOfWork.Products.GetAsync(productId);
            if (product == null)
            {
                throw new ArgumentException("product with this id does not exist");
            }

            var user = await _userManager.GetUserAsync(_httpContextAccessor.HttpContext.User);
            var likedProduct = await _unitOfWork.LikedProducts.GetAsync(
                new Composite2Key { Column1 = user.Id, Column2 = productId });
            if (likedProduct == null)
            {
                throw new NotFoundException(nameof(likedProduct) + "liked product with this id does not exist");
            }

            await _unitOfWork.LikedProducts.DeleteAsync(
                new Composite2Key { Column1 = productId, Column2 = user.Id });
            await _unitOfWork.SaveAsync();

            return productId;
        }

        public async Task<int> DeleteMessage(int messageId)
        {
            var message = await _unitOfWork.Messages.GetAsync(messageId);
            if (message == null)
            {
                throw new NotFoundException("message with this id does not exist");
            }

            await _unitOfWork.Messages.DeleteAsync(messageId);
            await _unitOfWork.SaveAsync();

            return messageId;
        }

        async public Task<int> DeleteReview(int id)
        {
            if (int.IsNegative(id) || id == 0)
                throw new ArgumentException(nameof(id) + " id can't be negative or 0");
            var review = await _unitOfWork.Reviews.GetAsync(id);

            if (review == null)
                throw new NotFoundException(nameof(CreateReviewDTO) + " неіснуючий відгук");

            await _unitOfWork.ReviewReplies.DeleteAsync(review.Id);
            await _unitOfWork.Reviews.DeleteAsync(id);
            await _unitOfWork.SaveAsync();

            return id;
        }

        public async Task<IEnumerable<ShoppingCart>> GetCart()
        {
            var user = await _userManager.GetUserAsync(_httpContextAccessor.HttpContext.User);
            var cart = await _unitOfWork.ShoppingCarts.FindAsync(lp => lp.UserId == user.Id);

            return cart;
        }

        public async Task<IEnumerable<LikedProduct>> GetLikedProducts()
        {
            var user = await _userManager.GetUserAsync(_httpContextAccessor.HttpContext.User);
            var likedProducts = await _unitOfWork.LikedProducts.FindAsync(lp => lp.UserId == user.Id);

            return likedProducts;
        }

        public async Task<IEnumerable<Message>> GetMessages()
        {
            var user = await _userManager.GetUserAsync(_httpContextAccessor.HttpContext.User);
            var messages = await _unitOfWork.Messages.FindAsync(lp => lp.UserId == user.Id);

            return messages;
        }

        public async Task<IEnumerable<Order>> GetOrders()
        {
            var user = await _userManager.GetUserAsync(_httpContextAccessor.HttpContext.User);
            var orders = await _unitOfWork.Orders.FindAsync(lp => lp.UserId == user.Id);

            return orders;
        }

        public async Task<int> UpdateCart(ShoppingCartPayload cartPayload)
        {
            ShoppingCartDTO shoppingCartDTO = _mapper.Map<ShoppingCartDTO>(cartPayload);
            var user = await _userManager.GetUserAsync(_httpContextAccessor.HttpContext.User);
            ShoppingCart entry = await _unitOfWork.ShoppingCarts.GetAsync(
                new Composite3Key
                {
                    Column1 = shoppingCartDTO.ProductId,
                    Column2 = user.Id,
                    Column3 = shoppingCartDTO.ColorId
                });

            if (entry == null)
            {
                throw new NotFoundException("shopping cart entry with this composite key does not exist");
            }

            entry.Quantity = shoppingCartDTO.Quantity;
            _unitOfWork.ShoppingCarts.Update(entry);
            await _unitOfWork.SaveAsync();
            return entry.ProductId;
        }

        public Task<int> UpdatePassword(PasswordUpdatePayload passwordUpdate)
        {
            throw new NotImplementedException();
        }

        public async Task<int> UpdatePhoto(UserPicturePayload pictureUpdate)
        {
            UserPictureDTO pictureDTO = _mapper.Map<UserPictureDTO>(pictureUpdate);

            if (string.IsNullOrEmpty(pictureDTO.PictureAddress))
                throw new ArgumentException("picture address is incorrect");

            Picture picture = new Picture
            {
                Address = pictureDTO.PictureAddress
            };
            _unitOfWork.Pictures.Create(picture);

            var user = await _userManager.GetUserAsync(_httpContextAccessor.HttpContext.User);
            User userEntity = await _unitOfWork.Users.GetAsync(user.Id);
            userEntity.PictureAddress = pictureDTO.PictureAddress;
            _unitOfWork.Users.Update(userEntity);

            await _unitOfWork.SaveAsync();
            return user.Id;
        }
    }
}
