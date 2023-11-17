using OnePlace.BOL.Analitics;

namespace OnePlace.BLL.Interfaces
{
    public interface IAnaliticService
    {
        Task<FiltersInfo> GetCategoryProductFilters(int categoryId);

    }
}
