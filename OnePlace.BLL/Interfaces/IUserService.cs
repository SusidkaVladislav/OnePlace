using OnePlace.BOL;
using OnePlace.BOL.CategoryPayload;
using OnePlace.BOL.Message;
using OnePlace.BOL.Password;
using OnePlace.BOL.Picture;
using OnePlace.BOL.Review;
using OnePlace.BOL.ShoppingCart;
using OnePlace.BOL.User;
using OnePlace.DAL.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OnePlace.BLL.Interfaces
{
    public interface IUserService
    {

        /// <summary>
        /// Добавити новий відгук
        /// </summary>
        /// <param name="review"></param>
        /// <returns></returns>
        Task<int> CreateReview(CreateReviewPayload review);

        /// <summary>
        /// Видалити відгук
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        Task<int> DeleteReview(int id);

        /// <summary>
        /// Добавити товар до кошика
        /// </summary>
        /// <param name="cart"></param>
        /// <returns></returns>
        Task<int> AddToCart(ShoppingCartPayload cart);

        /// <summary>
        /// Видалити товар з кошика
        /// </summary>
        /// <param name="cart"></param>
        /// <returns></returns>
        Task<int> DeleteFromCart(ShoppingCartPayload cart);

        /// <summary>
        /// Edits quantity of product in the cart
        /// </summary>
        /// <param name="cart"></param>
        /// <returns></returns>
        Task<int> UpdateCart(ShoppingCartPayload cart);

        /// <summary>
        /// Gets all products in the cart of current user
        /// </summary>
        /// <returns></returns>
        Task<IEnumerable<ShoppingCart>> GetCart();

        /// <summary>
        /// Adds product to "Liked"
        /// </summary>
        /// /// <param name="productId"></param>
        /// <returns></returns>
        Task<int> AddLikedProduct(int productId);

        /// <summary>
        /// Deletes product from "Liked"
        /// </summary>
        /// /// <param name="productId"></param>
        /// <returns></returns>
        Task<int> DeleteLikedProduct(int productId);

        /// <summary>
        /// Returns all liked products by current user
        /// </summary>
        /// <returns></returns>
        Task<IEnumerable<LikedProduct>> GetLikedProducts();

        /// <summary>
        /// Sends message to admin
        /// </summary>
        /// /// <param name="message"></param>
        /// <returns></returns>
        Task<int> AddMessage(MessagePayload message);

        /// <summary>
        /// Returns all messages of current user
        /// </summary>
        /// /// <param name="message"></param>
        /// <returns></returns>
        Task<IEnumerable<Message>> GetMessages();

        /// <summary>
        /// Deletes message
        /// </summary>
        /// /// <param name="messageId"></param>
        /// <returns></returns>
        Task<int> DeleteMessage(int messageId);

        /// <summary>
        /// Changes password of the current user
        /// </summary>
        /// /// <param name="passwordUpdate"></param>
        /// <returns></returns>
        Task<int> UpdatePassword(PasswordUpdatePayload passwordUpdate);

        /// <summary>
        /// Changes profile picture of the current user
        /// </summary>
        /// /// <param name="pictureUpdate"></param>
        /// <returns></returns>
        Task<int> UpdatePhoto(UserPicturePayload pictureUpdate);

        /// <summary>
        /// Returns all orders of the current user
        /// </summary>
        /// <returns></returns>
        Task<IEnumerable<Order>> GetOrders();

        Task<PureUser> GetUserPersonalData();
    }
}
