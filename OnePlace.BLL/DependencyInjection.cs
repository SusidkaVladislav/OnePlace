using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using OnePlace.BLL.Interfaces;
using OnePlace.BLL.Services;
using Serilog;
using System.Reflection;

namespace OnePlace.BLL
{
    public static class DependencyInjection
    {
        public static void RegisterBLLDependencies(this IServiceCollection services, IConfiguration Configuration)
        {
            //var ss = Configuration.GetValue<string>("ConnectionStrings:DefaultConnection");
            Log.Logger = new LoggerConfiguration()
                .ReadFrom.Configuration(Configuration)
                .WriteTo.Console()
                .CreateLogger();

            services.AddAutoMapper(Assembly.GetExecutingAssembly());
           
            services.AddScoped<IDeliveryService, DeliveryService>();
            services.AddScoped<IProductService, ProductService>();
            services.AddScoped<IOrderService, OrderService>();
            services.AddScoped<ICategoryService, CategoryService>();
            services.AddScoped<IUserProfileService, UserProfileService>();
        }
    }
}
