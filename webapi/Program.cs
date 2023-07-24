using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using OnePlace.BLL;
using OnePlace.DAL.EF;
using OnePlace.DAL.Entities;
using System;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<AppDbContext>(options =>options.UseSqlServer(connectionString));

builder.Services.AddIdentity<User, IdentityRole>()
    .AddEntityFrameworkStores<AppDbContext>()
    .AddDefaultTokenProviders();
// Add services to the container.

var serviceProvider = builder.Services.BuildServiceProvider();

using (var scope = serviceProvider.CreateScope())
{
    var roleManager = scope.ServiceProvider.GetRequiredService<RoleManager<IdentityRole>>();
    var userManager = scope.ServiceProvider.GetRequiredService<UserManager<User>>();

    await CreateRole(roleManager, "admin");
    await CreateRole(roleManager, "user");
    await CreateRole(roleManager, "company");
    await CreateUser(userManager, "admin", "admin", "0111111111", "admin@gmail.com", "Qwerty+1", "admin");
}

async Task CreateRole(RoleManager<IdentityRole> roleManager, string roleName)
{
    if (!await roleManager.RoleExistsAsync(roleName))
    {
        var role = new IdentityRole { Name = roleName };
        await roleManager.CreateAsync(role);
    }
}

async Task CreateUser(UserManager<User> userManager, string name, string surname, string phone_number, string email, string password, string roleName)
{
    var user = await userManager.FindByEmailAsync(email);
    if (user == null)
    {
        user = new User { Name = name, Surname = surname, PhoneNumber = phone_number, UserName = email, Email = email };
        await userManager.CreateAsync(user, password);
        await userManager.AddToRoleAsync(user, roleName);
    }
}

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.RegisterBLLDependencies(builder.Configuration);

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
