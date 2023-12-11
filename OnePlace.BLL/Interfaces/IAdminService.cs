using Microsoft.Extensions.ObjectPool;
using OnePlace.BOL;
using OnePlace.BOL.AdminDTO;
using OnePlace.BOL.AdminPayload;
using OnePlace.BOL.Description;
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
        Task<List<ManufacturerDTO>> GetAllManufacturers();
        Task<List<ManufacturerCountryDTO>> GetAllCountries();
        Task<List<ColorDTO>> GetAllColors();
        Task<List<DescriptionHeader>> GetDescriptionsByCategoryId(int categoryId);
        Task<int> CreateColor(ColorToAdd color);
        Task<int> DeleteColor(int colorId);
        Task<int> UpdateColor(ColorDTO color);
        Task<int> CreateCountry(string colorName);
        Task<int> DeleteCountry(int id);
        Task<int> UpdateCountry(ManufacturerCountryDTO country);
        Task<int> CreateBrand(string brandName);
        Task<int> DeleteBrand(int id);
        Task<int> UpdateBrand(ManufacturerDTO brand);
        Task<List<ProductSaleStatisticDTO>> GetProductSalingInfo(GetProductSaleStatisticPayload saleStatisticPayload);
        Task<int> GetUsersCountByRegistrateDate(DateTime date);

        Task<PureUser> GetUserPersonalData(int userId);
        Task<IEnumerable<ReviewDTO>> GetUserReviews(int userId);
    }
}
