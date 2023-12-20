using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Formatters;
using OnePlace.BLL.Interfaces;
using OnePlace.BLL.Validators;
using OnePlace.BOL.CategoryDTO;
using OnePlace.BOL.Exceptions;
using OnePlace.BOL.Message;
using OnePlace.BOL.Password;
using OnePlace.BOL.Picture;
using OnePlace.BOL.ProductDTO;
using OnePlace.BOL.Review;
using OnePlace.BOL.ShoppingCart;
using OnePlace.BOL.User;
using OnePlace.DAL.Entities;
using OnePlace.DAL.Interfaces;
using Stripe;
using Stripe.Climate;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
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
            if (product == null)
            {
                throw new ArgumentException("Неіснуючий товар!");
            }
            var userId = _httpContextAccessor.HttpContext.User.Claims.FirstOrDefault(c => c.Type == "UserId");
            if (userId is not null)
            {
                var likedProduct = await _unitOfWork.LikedProducts.GetAsync(new Composite2Key
                {
                    Column1 = Int32.Parse(userId.Value),
                    Column2 = productId
                });

                if (likedProduct is null)
                {
                    LikedProduct liked = new LikedProduct
                    {
                        ProductId = productId,
                        UserId = Int32.Parse(userId.Value)
                    };
                    _unitOfWork.LikedProducts.Create(liked);

                    await _unitOfWork.SaveAsync();
                }
              
                return productId;
            }

            return 0;
        }

        public async Task<int> AddMessage(MessagePayload messagePayload)
        {
            var product = await _unitOfWork.Products.GetAsync(messagePayload.ProductId);
            if (product == null)
            {
                throw new ArgumentException("Неіснуючий товар!");
            }

            Message message = _mapper.Map<Message>(messagePayload);

            var user = _httpContextAccessor.HttpContext.User.Claims.FirstOrDefault(c => c.Type == "UserId");
            int? userId = null;
            if (user is not null)
            {
                userId = Int32.Parse(user.Value);
            }

            message.UserId = userId;
            message.IsReplied = false;
            message.Date = DateTime.Now.Date;

            _unitOfWork.Messages.Create(message);
            await _unitOfWork.SaveAsync();

            return message.Id;
        }

        public async Task<int> AddToCart(ShoppingCartPayload cartPayload)
        {
            ShoppingCartDTO shoppingCartDTO = _mapper.Map<ShoppingCartDTO>(cartPayload);

            var user = _httpContextAccessor.HttpContext.User.Claims.FirstOrDefault(c => c.Type == "UserId");
            int userId = 0;
            if (user is not null)
            {
                userId = Int32.Parse(user.Value);
            }
            else
            {
                return 0;
            }

            ShoppingCart entry = await _unitOfWork.ShoppingCarts.GetAsync(
                new Composite3Key
                {
                    Column1 = shoppingCartDTO.ProductId,
                    Column2 = userId,
                    Column3 = shoppingCartDTO.ColorId
                });

            if (entry != null)
            {
                return entry.ProductId;
            }

            ShoppingCart cart = _mapper.Map<ShoppingCart>(shoppingCartDTO);
            cart.UserId = userId;
            _unitOfWork.ShoppingCarts.Create(cart);
            await _unitOfWork.SaveAsync();
            return cart.ProductId;
        }

        async public Task<int> CreateReview(CreateReviewPayload reviewPayload)
        {
            CreateReviewDTO reviewDTO = _mapper.Map<CreateReviewDTO>(reviewPayload);

            ReviewValidation validation = new ReviewValidation(_unitOfWork);

            if (reviewDTO == null)
                throw new NotFoundException("Переданий об'єкт рівний null");

            DAL.Entities.Review review = _mapper.Map<DAL.Entities.Review>(reviewDTO);

            //Встановлення дати створення відгуку
            review.Date = DateTime.Now.Date;

            var user = _httpContextAccessor.HttpContext.User.Claims.FirstOrDefault(c => c.Type == "UserId");
            if (user is not null)
            {
                var userId = Int32.Parse(user.Value);
                review.UserId = userId;
            }
            else
            {
                throw new ArgumentException("Користувач не авторизований");
            }
            _unitOfWork.Reviews.Create(review);

            await _unitOfWork.SaveAsync();

            return review.Id;
        }

        public async Task<int> DeleteFromCart(ShoppingCartPayload cartPayload)
        {
            var user = _httpContextAccessor.HttpContext.User.Claims.FirstOrDefault(c => c.Type == "UserId");
            int userId = 0;
            if (user is not null)
            {
                userId = Int32.Parse(user.Value);

                var cart = await _unitOfWork.ShoppingCarts.GetAsync(
                 new Composite3Key
                 {
                     Column1 = cartPayload.ProductId,
                     Column2 = userId,
                     Column3 = cartPayload.ColorId
                 });
                if (cart == null)
                {
                    return 0;
                }
                await _unitOfWork.ShoppingCarts.DeleteAsync(
                new Composite3Key
                {
                    Column1 = cartPayload.ProductId,
                    Column2 = userId,
                    Column3 = cartPayload.ColorId
                });
                await _unitOfWork.SaveAsync();
                return cartPayload.ProductId;
            }
            return 0;
        }

        public async Task<int> DeleteLikedProduct(int productId)
        {
            var product = await _unitOfWork.Products.GetAsync(productId);
            if (product == null)
            {
                throw new ArgumentException("Неіснуючий товар!");
            }

            var userId = _httpContextAccessor.HttpContext.User.Claims.FirstOrDefault(c => c.Type == "UserId");

            if (userId is not null)
            {
                var likedProduct = await _unitOfWork.LikedProducts.GetAsync(
                new Composite2Key { 
                    Column1 = Int32.Parse(userId.Value),
                    Column2 = productId
                }
                );
                if (likedProduct is not null)
                {
                    await _unitOfWork.LikedProducts.DeleteAsync(
                   new Composite2Key
                   {
                       Column1 = Int32.Parse(userId.Value),
                       Column2 = productId
                   });
                    await _unitOfWork.SaveAsync();
                }

                return productId;
            }

            return 0;
        }

        public async Task<bool> IsProductInLiked(int productId)
        {
            var product = await _unitOfWork.Products.GetAsync(productId);
            if (product == null)
            {
                throw new ArgumentException("Неіснуючий товар!");
            }

            var userId = _httpContextAccessor.HttpContext.User.Claims.FirstOrDefault(c => c.Type == "UserId");

            if (userId is not null)
            {
                var likedProduct = await _unitOfWork.LikedProducts.GetAsync(new Composite2Key
                {
                    Column1 = Int32.Parse(userId.Value),
                    Column2 = productId
                });

                if (likedProduct is not null)
                    return true;
                
                return false;
            }

            return false;
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
            var user = _httpContextAccessor.HttpContext.User.Claims.FirstOrDefault(c => c.Type == "UserId");
            if (user is not null)
            {
                var cart = await _unitOfWork.ShoppingCarts.FindAsync(lp => lp.UserId == Int32.Parse(user.Value));
                return cart;

            }
            return null;
        }

        public async Task<IEnumerable<LikedProduct>> GetLikedProducts()
        {
            var userId = _httpContextAccessor.HttpContext.User.Claims.FirstOrDefault(c => c.Type == "UserId");

            if (userId is not null)
            {
                int id = Int32.Parse(userId.Value);
                var likedProducts = await _unitOfWork.LikedProducts.FindAsync(lp => lp.UserId == id);
               
                return likedProducts;
            }

            return new List<LikedProduct>();
        }

        public async Task<IEnumerable<Message>> GetMessages()
        {
            var user = await _userManager.GetUserAsync(_httpContextAccessor.HttpContext.User);
            var messages = await _unitOfWork.Messages.FindAsync(lp => lp.UserId == user.Id);

            return messages;
        }

        public async Task<IEnumerable<OnePlace.DAL.Entities.Order>> GetOrders()
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

            entry.Quantity = 0;//shoppingCartDTO.Quantity;
            _unitOfWork.ShoppingCarts.Update(entry);
            await _unitOfWork.SaveAsync();
            return entry.ProductId;
        }

        public async Task<int> UpdatePassword(PasswordUpdateDTO passwordUpdate)
        {
            if(passwordUpdate.NewPassword.Length < 8)
                throw new BusinessException("Пароль занадто короткий!");

            var userId = _httpContextAccessor.HttpContext.User.Claims.FirstOrDefault(c => c.Type == "UserId");
            if (userId is not null)
            {
                var user = await _unitOfWork.Users.GetAsync(Int32.Parse(userId.Value));
                if (user is not null)
                {
                    var res = await _userManager.ChangePasswordAsync(user, passwordUpdate.CurrentPassword, passwordUpdate.NewPassword);
                    if(!res.Succeeded)
                    {
                        throw new BusinessException("Не правильний пароль!");
                    }
                }
            }   

            return 0;
        }

        public async Task<int> UpdatePhoto(UserPicturePayload picture)
        {
            if (string.IsNullOrEmpty(picture.PictureAddress))
                return 0;

            var userId = _httpContextAccessor.HttpContext.User.Claims.FirstOrDefault(c => c.Type == "UserId");
            if (userId is not null)
            {
                var user = await _unitOfWork.Users.GetAsync(Int32.Parse(userId.Value));
                if (user is not null)
                {
                    user.PictureURL = picture.PictureAddress;

                    _unitOfWork.Users.Update(user);
                    await _unitOfWork.SaveAsync();
                    return user.Id;
                }
            }
                return 0;
        }

        public async Task<int> UpdatePesonalData(UserDetails userData)
        {
            var userId = _httpContextAccessor.HttpContext.User.Claims.FirstOrDefault(c => c.Type == "UserId");

            if (userId is not null)
            {
                var user = await _unitOfWork.Users.GetAsync(Int32.Parse(userId.Value));
                
                if (user is not null)
                {
                    UserValidation validation = new UserValidation(_userManager);
                    var userToUpdate = await _userManager.FindByNameAsync(user.Email);

                    string oldPhone = user.PhoneNumber;

                    userToUpdate.Name= userData.Name;
                    userToUpdate.Surname= userData.Surname;
                    userToUpdate.PhoneNumber= userData.PhoneNumber;

                    try
                    {
                        await validation.ValidateUpdateUser(userToUpdate, oldPhone);
                    }
                    catch (BusinessException ex)
                    {
                        throw ex;
                    }
                    
                    await _userManager.UpdateAsync(userToUpdate);

                    return userToUpdate.Id;
                }
            }
            return 0;
        }

        public async Task<PureUser> GetUserPersonalData()
        {
            var userId = _httpContextAccessor.HttpContext.User.Claims.FirstOrDefault(c => c.Type == "UserId");
            if (userId is not null)
            {
                var user = await _unitOfWork.Users.GetAsync(Int32.Parse(userId.Value));
                return new PureUser
                {
                    Id = user.Id,
                    Name = user?.Name,
                    Email = user?.Email,
                    PhoneNumber = user?.PhoneNumber,
                    Surname = user?.Surname,
                    RegistrationDate = user.RegistrationDate,
                    PictureAddress = user?.PictureURL,
                    CountOfOrders = user.Orders.Count()
                };

            }
            return null;
        }

        public async Task<List<ReviewByProduct>> GetUserReviews()
        {
            List<ReviewByProduct> result = new List<ReviewByProduct>();
            var user = _httpContextAccessor.HttpContext.User.Claims.FirstOrDefault(c => c.Type == "UserId");
            int userId = 0;
            if (user is not null)
            {
                userId = Int32.Parse(user.Value);
                var reviews = _unitOfWork.Reviews.FindAsync(r => r.UserId == userId).Result.ToList();
                if (reviews.Count == 0)
                    return result;
                foreach (var review in reviews)
                {
                    ReviewByProduct reviewByProduct = new ReviewByProduct
                    {
                        Id = review.Id,
                        Comment = review.Comment,
                        CommentDate = review.Date,
                        NumberOfStars = review.NumberOfStars,
                        UserInitials = "",
                        ProductId = review.ProductId,
                        ProductName = review.Product.Name
                    };
                    
                    var reply = await _unitOfWork.ReviewReplies.GetAsync(review.Id);

                    if (reply is not null)
                    {
                        reviewByProduct.AmindReplyDate = reply.Date;
                        reviewByProduct.AdminReplyComment = reply.Comment;
                    }

                    //Підтягнути титульну картинку товару
                    var picture = await _unitOfWork.ProductPictures.FindAsync(pp => pp.ProductId == review.ProductId
                    && pp.IsTitle == true);

                    reviewByProduct.ProductPicture = picture.Select(p => p.Picture.Address).FirstOrDefault();

                    result.Add(reviewByProduct);
                }

                return result;
            }

            return result;
        }

        public async Task<List<SoldProduct>> GetSoldProducts()
        {
            List<SoldProduct> soldProducts = new List<SoldProduct>();

            var user = _httpContextAccessor.HttpContext.User.Claims.FirstOrDefault(c => c.Type == "UserId");
            if (user is not null)
            {
               var orders = await _unitOfWork.Orders.FindAsync(o =>
                o.UserId == Int32.Parse(user.Value)
                && o.State == DAL.Enums.OrderState.Done && o.PaymentStatus == DAL.Enums.PaymentStatus.Approved);

               if(orders is not null)
               {
                    foreach (var order in orders)
                    {
                        var productsFromOrder = await _unitOfWork.OrderProducts.FindAsync(op => op.OrderId == order.Id);
                        if(productsFromOrder is not null)
                        {
                            foreach (var product in productsFromOrder)
                            {
                                if(soldProducts.All(p=>p.ProductId != product.ProductId))
                                {
                                    var p = await _unitOfWork.Products.GetAsync(product.ProductId);
                                    
                                    if(p is not null)
                                    {
                                        SoldProduct soldProduct = new SoldProduct();
                                        
                                        soldProduct.ProductId = p.Id;
                                        soldProduct.Name = p.Name;

                                        //Підтягнути титульну картинку товару
                                        var picture = await _unitOfWork.ProductPictures.FindAsync(pp => pp.ProductId == p.Id
                                        && pp.IsTitle == true);

                                        soldProduct.PicureAddress = picture.Select(p => p.Picture.Address).FirstOrDefault();

                                        soldProducts.Add(soldProduct);
                                    }
                                }
                            }
                        }
                    }
               }
            }

            return soldProducts;
        }

        public async Task<List<UserMessageDTO>> GetUserMessages()
        {
            List<UserMessageDTO> userMessages= new List<UserMessageDTO>();

            var user = _httpContextAccessor.HttpContext.User.Claims.FirstOrDefault(c => c.Type == "UserId");
            if (user is not null)
            {
                var messages = await _unitOfWork.Messages.FindAsync(m => m.UserId == Int32.Parse(user.Value));
            
                if(messages is not null)
                {
                    foreach (var message in messages)
                    {
                        UserMessageDTO userMessage = new UserMessageDTO
                        {
                            MessageId = message.Id,
                            ProductId= message.ProductId,
                            Date= message.Date,
                            IsReplied= message.IsReplied,
                            MessageText= message.MessageText,
                            ProductName = message.Product.Name
                        };
                        
                        var picture = await _unitOfWork.ProductPictures.FindAsync(pp => pp.ProductId == message.ProductId
                                        && pp.IsTitle == true);
                        
                        userMessage.PictureAddress = picture.Select(p => p.Picture.Address).FirstOrDefault();
                        
                        userMessages.Add(userMessage);
                    }
                }
            }

            return userMessages;
        }
    }
}
