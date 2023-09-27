using OnePlace.BOL.Message;
using OnePlace.BOL.OrderPayload;
using OnePlace.BOL.Review;
using OnePlace.BOL.ReviewReply;
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
        Task<IEnumerable<MessageDTO>> GetMessages();
        Task<int> UpdateMessage(UpdateMessagePayload message);
        Task<int> DeleteMessage(int id);
        Task<IEnumerable<PureUser>> GetUsers();
        Task<int> DeleteUser(int id);
        Task<IEnumerable<ReviewDTO>> GetReviews();
        Task<ReviewDTO> GetReview(int id);
        Task<int> DeleteReview(int id);
        Task<IEnumerable<ReviewReplyDTO>> GetReviewReplies();
        Task<ReviewReplyDTO> GetReviewReply(int id);
        Task<int> DeleteReviewReply(int id);
        Task<int> AddReviewReply(ReviewReplyPayload reviewReply);
    }
}
