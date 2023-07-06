using BLL.Interfaces;
using DTO.Review;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace webapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReviewController : ControllerBase
    {
        private readonly IReviewService _reviewService;
        public ReviewController(IReviewService reviewService)
        {
            _reviewService= reviewService;
        }

        [HttpGet]
        public async Task<ActionResult<List<ReviewDTO>>> GetReviews()
        {
            try
            {
                return Ok(await _reviewService.GetReviewsAsync());
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ReviewDTO>> GetReview(long id)
        {
            try
            {
                return Ok(await _reviewService.GetReviewByIdAsync(id));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        public async Task<ActionResult<ReviewDTO>> AddReview(ReviewToAddDTO reviewToAddDTO)
        {
            try
            {
                return Ok(await _reviewService.AddReviewAsync(reviewToAddDTO));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut]
        public async Task<ActionResult<ReviewDTO>> UpdateReview(ReviewDTO reviewDTO)
        {
            try
            {
                return Ok(await _reviewService.UpdateReviewAsync(reviewDTO));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete]
        public async Task<ActionResult> DeleteReview(long id)
        {
            try
            {
                return Ok(/*await _reviewService.DeleteReviewAsync(id)*/);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
