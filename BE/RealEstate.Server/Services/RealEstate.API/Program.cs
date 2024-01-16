using IdentityServerBase.Middlewares;
using RealEstate.API.Middlewares;
using RealEstate.ApplicationService.AuthModule.Abstracts;
using RealEstate.ApplicationService.AuthModule.Implements;
using RealEstate.ApplicationService.Common.Localization;
using RealEstate.ApplicationService.ConfigurationModule.Abstracts;
using RealEstate.ApplicationService.ConfigurationModule.Implements;
using RealEstate.IdentityServerBase.StartUp;
using RealEstate.Infrastructure.Persistence;
using RealEstate.Utils.Localization;
using WebAPIBase;

var builder = WebApplication.CreateBuilder(args);
builder.ConfigureCors();
builder.ConfigureServices(isIdentityServer: true);
builder.Services.AddCommonIdentityServer<RealEstateDbContext>(builder.Configuration);

builder.Services.AddSingleton<LocalizationBase, RealEstateLocalization>();
builder.Services.AddSingleton<MapErrorCodeBase>();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IConfigurationService, ConfigurationService>();
var app = builder.Build();

app.Configure();
app.UseCheckAuthorizationToken();
app.UseCheckUser();
app.ConfigureEndpoint();

app.Run();
