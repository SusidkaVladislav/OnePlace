using DTO.Delivery;
using DTO.Review;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Interfaces
{
    public interface IReviewService
    {
        Task<List<ReviewDTO>> GetReviewsAsync();
        Task<ReviewDTO> GetReviewByIdAsync(long id);
        Task<ReviewDTO> AddReviewAsync(ReviewToAddDTO reviewToAdd);
        Task<ReviewDTO> UpdateReviewAsync(ReviewDTO reviewDTO);
        Task DeleteReviewAsync(long id);
    }
}
