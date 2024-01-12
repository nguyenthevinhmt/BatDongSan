using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using RealEstate.Infrastructure.Persistence;
using System.Reflection;

namespace RealEstate.HostConsole
{
    public class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Hello, World!");
            IHost host = CreateHostBuilder(args).Build();

            //var localization = new JVFLocalization();

            //var dbContext = host.Services.GetService<WebSellDbContext>();
            //dbContext.Users.ToList();

            var test = StringFormat("abc {0}, {1}", 0, "1");
        }

        public static string StringFormat(string template, params object[] values)
        {
            return string.Format(template, values);
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder()
                .ConfigureAppConfiguration(app =>
                {
                    app.AddJsonFile("appsettings.json");
                })
                .ConfigureServices((hostContext, services) =>
                {
                    string assemblyName = Assembly.GetExecutingAssembly().GetName().Name!;

                    string connectionString = hostContext.Configuration.GetConnectionString("Default")!;

                    // Add Hangfire services.
                    //services.AddHangfire(configuration =>
                    //{
                    //    configuration
                    //        .SetDataCompatibilityLevel(CompatibilityLevel.Version_170)
                    //        .UseSimpleAssemblyNameTypeSerializer()
                    //        .UseSerializerSettings(new JsonSerializerSettings
                    //        {
                    //            ReferenceLoopHandling = ReferenceLoopHandling.Ignore
                    //        });
                    //    configuration.UseInMemoryStorage();
                    //    // Add the processing server as IHostedService
                    //    services.AddHangfireServer((service, options) =>
                    //    {
                    //        options.ServerName = $"CONSOLE";
                    //        options.WorkerCount = 100;
                    //    });
                    //});

                    //entity framework
                    services.AddDbContext<RealEstateDbContext>(options =>
                    {
                        options.UseSqlServer(connectionString, option => option.MigrationsAssembly("HostConsole"));
                        options.UseOpenIddict();
                    });

                    services.AddHttpContextAccessor();
                });
    }
}