using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using RealEstate.ApplicationService.Common;
using RealEstate.ApplicationService.ConfigurationModule.Abstracts;
using RealEstate.ApplicationService.ConfigurationModule.Dtos;

namespace RealEstate.ApplicationService.ConfigurationModule.Implements
{
    public class ConfigurationService : ServiceBase, IConfigurationService
    {
        public ConfigurationService(ILogger<ConfigurationService> logger, IHttpContextAccessor httpContext) : base(logger, httpContext)
        {
        }

        public ConfigurationDto GetConfiguration()
        {
            var configuration = new ConfigurationDto()
            {
                Dictionary = _localization.Dictionary
            };
            return configuration;
        }

    }
}