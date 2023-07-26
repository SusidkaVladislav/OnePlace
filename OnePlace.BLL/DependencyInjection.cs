using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using OnePlace.BLL.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace OnePlace.BLL
{
    public static class DependencyInjection
    {
        public static void RegisterBLLDependencies(this IServiceCollection services, IConfiguration Configuration)
        {
            services.AddAutoMapper(Assembly.GetExecutingAssembly());
            services.AddScoped<IDeliveryService, IDeliveryService>();
            services.AddScoped<IProductService, IProductService>();
            services.AddScoped<IOrderService, IOrderService>();
            services.AddScoped<ICategoryService, ICategoryService>();
        }
    }
}
