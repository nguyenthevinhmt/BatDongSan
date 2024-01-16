using Microsoft.AspNetCore.Mvc;
using RealEstate.ApplicationService.ConfigurationModule.Abstracts;
using RealEstate.ApplicationService.ConfigurationModule.Dtos;
using WebAPIBase.Controller;
using RealEstate.Utils;

namespace RealEstate.API.Controllers
{
    [Route("api/configuration")]
    [ApiController]
    public class ConfigurationController : ApiControllerBase
    {
        private readonly IConfigurationService _configurationService;

        public ConfigurationController(IConfigurationService configurationService)
        {
            _configurationService = configurationService;
        }

        /// <summary>
        /// Lấy thông tin các config cho ứng dụng
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public ApiResponse<ConfigurationDto> GetConfiguration() => new(_configurationService.GetConfiguration());
    }
}
