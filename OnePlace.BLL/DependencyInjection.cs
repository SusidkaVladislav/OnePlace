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

            //MapperConfiguration config = new MapperConfiguration(cfg =>
            //{
            //    cfg.AddProfile(new CategoryProfile());  //mapping between Web and Business layer objects
            //    //cfg.AddProfile(new BLProfile());  // mapping between Business and DB layer objects
            //});

            //services.AddAutoMapper(cfg => config.CreateMapper());

            //services.AddAutoMapper(Assembly.GetExecutingAssembly());

            services.AddAutoMapper(typeof(CategoryProfile));
            services.AddAutoMapper(typeof(ProductProfile));
            services.AddAutoMapper(typeof(AccountProfile));

            services.AddScoped<IDeliveryService, DeliveryService>();
            services.AddScoped<IProductService, ProductService>();
            services.AddScoped<IOrderService, OrderService>();
            services.AddScoped<ICategoryService, CategoryService>();
            services.AddScoped<IAccountService, AccountService>();
            services.AddScoped<IUnitOfWork, UnitOfWork>();
        }
    }
}
