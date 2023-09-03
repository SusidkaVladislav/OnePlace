using OnePlace.DAL.EF;

namespace OnePlace.DAL.Interfaces
{
    public interface IAppDbContextProvider
    {
        AppDbContext GetDbContext();
    }
}
