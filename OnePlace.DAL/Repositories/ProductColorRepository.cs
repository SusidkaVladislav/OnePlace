using Microsoft.AspNetCore.Identity;
using OnePlace.DAL.EF;
using OnePlace.DAL.Entities;

namespace OnePlace.DAL.Repositories
{
    public class ProductColorRepository : RepositoryBase<ProductColor, CompositeKey>
    {
        public ProductColorRepository(AppDbContext context, 
            UserManager<User> userManager) : base(context, userManager) { }


    }
}
