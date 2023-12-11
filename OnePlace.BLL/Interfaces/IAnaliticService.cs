using OnePlace.BOL.Analitics;
using OnePlace.BOL.Review;

namespace OnePlace.BLL.Interfaces
{
    public interface IAnaliticService
    {
        Task<FiltersInfo> GetCategoryProductFilters(int categoryId);

        Task<List<ReviewByProduct>> GetProductReviews(int productId);

    }
}
