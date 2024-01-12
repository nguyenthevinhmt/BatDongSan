using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using RealEstate.API.Middlewares;
using RealEstate.ApplicationBase.Localization;
using RealEstate.ApplicationService.Common.Localization;
using RealEstate.IdentityServerBase.StartUp;
using RealEstate.Infrastructure.Persistence;
using WebAPIBase;

var builder = WebApplication.CreateBuilder(args);
//entity framework
builder.Services.AddDbContext<RealEstateDbContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("Default"), options => options.MigrationsAssembly("RealEstate.API"));
    options.UseOpenIddict();

}, ServiceLifetime.Scoped);

builder.Services.AddDbContext<RealEstateDbContextTransient>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("Default"));
}, ServiceLifetime.Transient);
builder.ConfigureCors();
builder.ConfigureServices(isIdentityServer: true);
builder.Services.AddCommonIdentityServer<RealEstateDbContext>(builder.Configuration);

builder.Services.AddSingleton<LocalizationBase, RealEstateLocalization>();
builder.Services.AddSingleton<MapErrorCodeBase>();
var app = builder.Build();

app.Configure();
app.UseCheckUser();
app.ConfigureEndpoint();

app.Run();
