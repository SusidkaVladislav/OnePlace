using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using OnePlace.BLL.Interfaces;
using OnePlace.BLL.Mappings;
using OnePlace.BLL.Services;
using OnePlace.DAL.Interfaces;
using OnePlace.DAL.Repositories;
using Serilog;

namespace OnePlace.BLL
{
    public static class DependencyInjection
    {
        public static void RegisterBLLDependencies(this IServiceCollection services, IConfiguration Configuration)
        {
            //var ss = Configuration.GetValue<string>("ConnectionStrings:DefaultConnection");
            //Log.Logger = new LoggerConfiguration()
            //    .ReadFrom.Configuration(Configuration)
            //    .WriteTo.Console()
            //    .CreateLogger();

            services.AddAutoMapper(typeof(CategoryProfile));
            services.AddAutoMapper(typeof(ProductProfile));
            services.AddAutoMapper(typeof(AccountProfile));
            services.AddAutoMapper(typeof(AdminProfile));
            services.AddAutoMapper(typeof(OrderProfile));
            services.AddAutoMapper(typeof(UserProfile));

            services.AddScoped<IUnitOfWork, UnitOfWork>();
            services.AddScoped<IProductService, ProductService>();
            services.AddScoped<IOrderService, OrderService>();
            services.AddScoped<ICategoryService, CategoryService>();
            services.AddScoped<IAccountService, AccountService>();
            services.AddScoped<IAdminService, AdminService>();
            services.AddScoped<IUserService, UserService>();
            services.AddScoped<IAnaliticService, AnaliticService>();
        }
    }
}
