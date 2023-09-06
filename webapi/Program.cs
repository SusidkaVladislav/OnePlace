using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using OnePlace.BLL;
using OnePlace.DAL.EF;
using OnePlace.DAL.Entities;
using webapi.Exceptions;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<AppDbContext>(options => 
{
    options.UseSqlServer(connectionString);
    options.UseQueryTrackingBehavior(QueryTrackingBehavior.NoTracking);
});

builder.Services.AddIdentity<User, Role>()
    .AddEntityFrameworkStores<AppDbContext>()
    .AddDefaultTokenProviders();

    //Add services to the container.

var serviceProvider = builder.Services.BuildServiceProvider();

using (var scope = serviceProvider.CreateScope())
{
    var roleManager = scope.ServiceProvider.GetRequiredService<RoleManager<Role>>();
    var userManager = scope.ServiceProvider.GetRequiredService<UserManager<User>>();

    await roleManager.CreateAsync(new Role("admin"));
    await roleManager.CreateAsync(new Role("user"));
    await roleManager.CreateAsync(new Role("company"));
    await CreateUser(userManager, "admin", "admin", "0111111111", "admin@gmail.com", "Qwerty+1", "admin");
    await CreateUser(userManager, "user", "user", "0222222222", "user@gmail.com", "Qwerty+2", "user");
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

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(builder =>
    {
        builder.WithOrigins("http://localhost:3000") // Add your frontend URL here
               .AllowAnyHeader()
               .AllowAnyMethod();
    });
});

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

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();
app.UseCors();  
//Обробка виключних ситуацій в контролерах
app.UseException();
app.Run();
