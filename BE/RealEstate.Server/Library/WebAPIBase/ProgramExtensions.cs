using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using RealEstate.ApplicationService.FileModule.Dtos.Settings;
using RealEstate.Infrastructure.Persistence;
using RealEstate.Utils.ConstantVariables.Shared;
using RealEstate.Utils.Securiry;
using StackExchange.Profiling.Storage;
using Swashbuckle.AspNetCore.SwaggerUI;
using System.Reflection;
using WebAPIBase.Filters;
using WebAPIBase.MiddleWares;

namespace WebAPIBase
{
    /// <summary>
    /// Các hàm mở rộng cho program web api, cấu hình services, middleware pipeline
    /// </summary>
    public static class ProgramExtensions
    {
        public const string DbConnection = "Default";
        public const string Redis = "Redis";
        public const string Jwk = "Jwk";
        public const string CorsPolicy = "cors_policy";

        /// <summary>
        /// Config default services <br/>
        /// <paramref name="isIdentityServer"/> Có phải là identity server không <br/>
        /// </summary>
        public static void ConfigureServices(this WebApplicationBuilder builder, string miniProfilerBasePath = "/", bool isIdentityServer = false)
        {
            var services = builder.Services;
            services.AddOptions();
            services.AddHealthChecks();

            services.Configure<FormOptions>(o =>
            {
                o.MultipartBodyLengthLimit = int.MaxValue; //tối đa 2GB
            });

            //config file
            services.Configure<FileConfig>(builder.Configuration.GetSection("FileConfig:File"));

            services.AddControllersWithViews(options =>
            {
                options.Filters.Add<ExceptionFilter>();
                options.Filters.Add(typeof(CustomValidationError));
            });

            ConfigureAutoMap(services);

            services.AddMemoryCache();
            services.AddMiniProfiler(options =>
            {
                options.RouteBasePath = miniProfilerBasePath; //profiler/results-index
                (options.Storage as MemoryCacheStorage)!.CacheDuration = TimeSpan.FromMinutes(60);
                options.SqlFormatter = new StackExchange.Profiling.SqlFormatters.InlineFormatter();
            }).AddEntityFramework();

            services.AddSwaggerGen(option =>
            {
                option.OperationFilter<AddCommonParameterSwagger>();

                option.SwaggerDoc("v1", new OpenApiInfo { Title = Assembly.GetExecutingAssembly().GetName().Name, Version = "v1" });

                option.AddSecurityDefinition(JwtBearerDefaults.AuthenticationScheme, new OpenApiSecurityScheme
                {
                    Description = "JWT Authorization header using the Bearer scheme. Example: \"Authorization: Bearer {token}\"",
                    Name = "Authorization",
                    BearerFormat = "JWT",
                    In = ParameterLocation.Header,
                    Type = SecuritySchemeType.ApiKey
                });

                option.AddSecurityRequirement(new OpenApiSecurityRequirement
                {
                    {
                        new OpenApiSecurityScheme
                        {
                            Reference = new OpenApiReference
                            {
                                Type = ReferenceType.SecurityScheme,
                                Id = JwtBearerDefaults.AuthenticationScheme
                            }
                        },
                        Array.Empty<string>()
                    }
                });

                // Set the comments path for the Swagger JSON and UI.**
                var xmlFile = Path.Combine(AppContext.BaseDirectory, $"{Assembly.GetExecutingAssembly().GetName().Name}.xml");
                if (File.Exists(xmlFile))
                {
                    option.IncludeXmlComments(xmlFile);
                }
                var projectDependencies = Assembly.GetEntryAssembly()!.CustomAttributes
                    .SelectMany(c => c.ConstructorArguments.Select(ca => ca.Value?.ToString()))
                    .Where(o => o != null)
                    .ToList();
                foreach (var assembly in projectDependencies)
                {
                    var otherXml = Path.Combine(AppContext.BaseDirectory, $"{assembly}.xml");
                    if (File.Exists(otherXml))
                    {
                        option.IncludeXmlComments(otherXml);
                    }
                }
                option.CustomSchemaIds(x => x.FullName);
            });

            services.AddAuthorization();
            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(JwtBearerDefaults.AuthenticationScheme, options =>
            {
                var rsaSecurityKey = CryptographyUtils.ReadKey(builder.Configuration.GetValue<string>("IdentityServer:PublicKey")!,
                    builder.Configuration.GetValue<string>("IdentityServer:PrivateKey")!);

                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateAudience = false,
                    ValidateIssuer = false,
                    ValidateLifetime = true,
                    IssuerSigningKey = rsaSecurityKey
                };
                options.RequireHttpsMetadata = false;

                options.Events = new JwtBearerEvents
                {
                    OnMessageReceived = context =>
                    {
                        //lấy token trong header
                        var accessToken = context.Request.Query.FirstOrDefault(q => q.Key == "access_token").Value.ToString();
                        if (string.IsNullOrEmpty(accessToken))
                        {
                            accessToken = context.Request.Headers.FirstOrDefault(h => h.Key == "access_token").Value.ToString();
                        }

                        // If the request is for our hub...
                        var path = context.HttpContext.Request.Path;
                        if (!string.IsNullOrEmpty(accessToken) && path.StartsWithSegments("/hub"))
                        {
                            // Read the token out of the query string
                            context.Token = accessToken;
                        }
                        return Task.CompletedTask;
                    }
                };
            });

            // Add your logging handler
            //builder.Logging.AddLog4Net();

            //nếu có cấu hình redis
            string redisConnectionString = builder.Configuration.GetConnectionString(Redis)!;
            string connectionString = builder.Configuration.GetConnectionString(DbConnection)!;

            //entity framework
            services.AddDbContext<RealEstateDbContext>(options =>
            {
                //options.UseInMemoryDatabase("DbDefault");
                options.UseSqlServer(connectionString);

                if (isIdentityServer)
                {
                    // Register the entity sets needed by OpenIddict.
                    // Note: use the generic overload if you need to replace the default OpenIddict entities.
                    options.UseOpenIddict();
                }
            }, ServiceLifetime.Scoped);

            services.AddDbContext<RealEstateDbContextTransient>(options =>
            {
                options.UseSqlServer(connectionString);
            }, ServiceLifetime.Transient);

            services.AddHttpContextAccessor();
            services.AddDistributedMemoryCache();
            services.AddSession();
            services.AddDataProtection();

            // Add Hangfire services.
            //services.AddHangfire(configuration =>
            //{
            //    configuration
            //        .SetDataCompatibilityLevel(CompatibilityLevel.Version_170)
            //        .UseLog4NetLogProvider()
            //        .UseSimpleAssemblyNameTypeSerializer()
            //        .UseSerializerSettings(new JsonSerializerSettings
            //        {
            //            ReferenceLoopHandling = ReferenceLoopHandling.Ignore
            //        });
            //    if (!string.IsNullOrWhiteSpace(redisConnectionString))
            //    {
            //        configuration.UseRedisStorage(redisConnectionString, new RedisStorageOptions
            //        {
            //            Prefix = $"{{hangfire-{Assembly.GetExecutingAssembly().GetName().Name}}}:",
            //        });
            //    }
            //    else
            //    {
            //        configuration.UseInMemoryStorage();
            //    }
            //});

            // Add the processing server as IHostedService
            //services.AddHangfireServer((service, options) =>
            //{
            //    options.ServerName = Assembly.GetExecutingAssembly().GetName().Name;
            //    options.WorkerCount = 100;
            //});

            ////signalR
            //var signalRBuilder = services.AddSignalR();
            //if (!string.IsNullOrWhiteSpace(redisConnectionString))
            //{
            //    signalRBuilder.AddStackExchangeRedis(redisConnectionString, options =>
            //    {
            //        options.Configuration.ChannelPrefix = $"{{SignalR-{Assembly.GetExecutingAssembly().GetName().Name}}}";
            //    });
            //}
        }

        /// <summary>
        /// Config default middleware pipeline
        /// </summary>
        public static void Configure(this WebApplication app)
        {
            if (EnvironmentNames.DevelopEnv.Contains(app.Environment.EnvironmentName))
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(options =>
                {
                    options.SwaggerEndpoint("/swagger/v1/swagger.json", $"{Assembly.GetExecutingAssembly().GetName().Name} v1");
                    options.DocExpansion(DocExpansion.None);
                });
            }
            //app.UseHttpsRedirection();

            app.UseMiniProfiler();
            app.UseRequestLocalizationCustom();
            app.UseForwardedHeaders();
            app.UseRouting();
            app.UseCors(CorsPolicy);

            app.UseAuthentication();
            app.UseAuthorization();
            app.UseSession();
        }

        public static void ConfigureEndpoint(this WebApplication app)
        {
            //app.UseHangfireDashboard();
            app.MapHealthChecks("/health");
            //app.MapHangfireDashboard("/hangfire");
            app.MapControllers();
        }

        /// <summary>
        /// Kiểm tra resolve service
        /// </summary>
        /// <param name="app"></param>
        /// <param name="services"></param>
        public static void TestResolveService(this WebApplication app, IServiceCollection services)
        {
            using var scope = app.Services.CreateScope();
            foreach (var service in services)
            {
                var type = service.ServiceType;
                if (!type.FullName!.Contains("Service"))
                {
                    continue;
                }
                app.Services.GetService(type);
            }
        }

        /// <summary>
        /// Tự tìm trong các Project Dependencies xem có định nghĩa class AutoMapProfile nào không nếu có thì thêm vào hàm AddAutoMapper
        /// </summary>
        public static void ConfigureAutoMap(IServiceCollection services)
        {
            List<string> projectDependencyNames = new();
            projectDependencyNames.AddRange(Assembly.GetEntryAssembly()!.CustomAttributes
                                                                    .SelectMany(c => c.ConstructorArguments.Select(ca => ca.Value?.ToString()))
                                                                    .Where(o => o != null)
                                                                    .ToList()!);
            projectDependencyNames.AddRange(Assembly.GetExecutingAssembly().CustomAttributes
                                                                    .SelectMany(c => c.ConstructorArguments.Select(ca => ca.Value?.ToString()))
                                                                    .Where(o => o != null)
                                                                    .ToList()!);
            projectDependencyNames.AddRange(Assembly.GetCallingAssembly().CustomAttributes
                                                                    .SelectMany(c => c.ConstructorArguments.Select(ca => ca.Value?.ToString()))
                                                                    .Where(o => o != null)
                                                                    .ToList()!);
            List<Type> autoMapProfiles = new();

            foreach (var dependency in projectDependencyNames)
            {
                Assembly assembly = null!;
                //thử load assembly
                try
                {
                    assembly = Assembly.Load(dependency);
                }
                catch
                {
                }

                if (assembly != null)
                {
                    var getAutoMapProfiles = assembly.DefinedTypes.Where(dt => dt.BaseType?.FullName == "AutoMapper.Profile")
                        .Select(o => o.AsType())
                        .ToList();
                    autoMapProfiles.AddRange(getAutoMapProfiles);
                }
            }

            services.AddAutoMapper(autoMapProfiles.ToArray());
        }

        public static void ConfigureCors(this WebApplicationBuilder builder)
        {
            string allowOrigins = builder.Configuration.GetSection("AllowedOrigins").Value!;
            //File.WriteAllText("cors.now.txt", $"CORS: {allowOrigins}");
            var origins = allowOrigins.Split(';').Where(s => !string.IsNullOrWhiteSpace(s)).ToArray();
            builder.Services.AddCors(options =>
            {
                options.AddPolicy(CorsPolicy,
                    builder =>
                    {
                        builder
                            .WithOrigins(origins)
                            .AllowAnyMethod()
                            .AllowAnyHeader()
                            .AllowCredentials()
                            .WithExposedHeaders("Content-Disposition");
                    });
            });
        }
    }
}
