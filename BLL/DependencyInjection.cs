﻿using BLL.Interfaces;
using BLL.LogicServices;
using BLL.Utilities.AutoMapperProfiles;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace BLL
{
    public static class DependencyInjection
    {
        public static void RegisterBLLDependencies(this IServiceCollection services, IConfiguration Configuration)
        {
            //services.AddAutoMapper(typeof(AutoMapperProfiles));
            services.AddScoped<IWarehouseService, WarehouseService>();
            services.AddScoped<IWarehouseProductService, WarehouseProductService>();
            services.AddScoped<IFirstLevelCategoryService, FirstLevelCategoryService>();
            services.AddScoped<ISecondLevelCategoryService, SecondLevelCategoryService>();
            services.AddScoped<IThirdLevelCategoryService, ThirdLevelCategoryService>();
            services.AddScoped<IDescriptionService, DescriptionService>();
            services.AddScoped<IUserService, UserService>();
            services.AddScoped<IPictureService, PictureService>();
            services.AddScoped<IDeliveryService, DeliveryService>();
            services.AddScoped<IReviewService, ReviewService>();
            services.AddScoped<IOrderService, OrderService>();
            services.AddScoped<ILikedProductService, LikedProductService>();
            services.AddScoped<ISaleService, SaleService>();
            services.AddScoped<IManufactureCountryService, ManufactureCountryService>();
            services.AddScoped<IManufacturerService, ManufacturerService>();
            services.AddScoped<IMaterialService, MaterialService>();
        
        }


    }
}
