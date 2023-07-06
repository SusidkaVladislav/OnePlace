using BLL.Interfaces;
using DTO.Review;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.LogicServices
{
    public class ReviewService : IReviewService
    {
        public async Task<ReviewDTO> AddReviewAsync(ReviewToAddDTO reviewToAdd)
        {
            throw new NotImplementedException();
        }

        public async Task DeleteReviewAsync(long id)
        {
            throw new NotImplementedException();
        }

        public async Task<ReviewDTO> GetReviewByIdAsync(long id)
        {
            throw new NotImplementedException();
        }

        public async Task<List<ReviewDTO>> GetReviewsAsync()
        {
            throw new NotImplementedException();
        }

        public async Task<ReviewDTO> UpdateReviewAsync(ReviewDTO reviewDTO)
        {
            throw new NotImplementedException();
        }
    }
}
