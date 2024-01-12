using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using RealEstate.IdentityServerBase.Services;
using RealEstate.Utils.Securiry;


namespace RealEstate.IdentityServerBase.StartUp
{
    public static class ServiceCollectionExtensions
    {
        public static void AddCommonIdentityServer<TDbContext>(this IServiceCollection services,
            ConfigurationManager configuration) where TDbContext : DbContext
        {
            services.AddOpenIddict()
            .AddCore(options =>
            {
                options.UseEntityFrameworkCore().UseDbContext<TDbContext>();
            })
            .AddServer(options =>
            {
                // Enable the token endpoint.
                options.SetAuthorizationEndpointUris("/connect/authorize")
                       .SetTokenEndpointUris("/connect/token")
                       .SetUserinfoEndpointUris("/connect/userinfo")
                       .SetLogoutEndpointUris("/connect/logout");

                // Enable the client credentials flow.
                options.AllowPasswordFlow().AllowRefreshTokenFlow();

                options.SetAccessTokenLifetime(TimeSpan.FromHours(1));
                options.SetRefreshTokenLifetime(TimeSpan.FromDays(3));

                // Accept anonymous clients (i.e clients that don't send a client_id).
                // options.AcceptAnonymousClients();

                // Disable mã hóa token (Vd: dùng dòng này thì jwt.io đọc được, cmt vào thì ko đọc đc)
                options.DisableAccessTokenEncryption();

                // Register the signing and encryption credentials.
                var rsaSecurityKey = CryptographyUtils.ReadKey(configuration.GetValue<string>("IdentityServer:PublicKey")!,
                    configuration.GetValue<string>("IdentityServer:PrivateKey")!);
                options.AddEncryptionKey(rsaSecurityKey);
                options.AddSigningKey(rsaSecurityKey);

                // Register the ASP.NET Core host and configure the ASP.NET Core options.
                options.UseAspNetCore()
                       .EnableTokenEndpointPassthrough()
                       .EnableLogoutEndpointPassthrough()
                       .DisableTransportSecurityRequirement(); //không bắt https
            })
            .AddValidation(options =>
            {

                // Import the configuration from the local OpenIddict server instance.
                options.UseLocalServer();

                // Register the ASP.NET Core host.
                options.UseAspNetCore();
            });
            services.AddHostedService<Worker<TDbContext>>();
        }
    }
}
