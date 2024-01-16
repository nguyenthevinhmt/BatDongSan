using RealEstate.ApplicationService.ConfigurationModule.Dtos;

namespace RealEstate.ApplicationService.ConfigurationModule.Abstracts
{
    public interface IConfigurationService
    {
        ConfigurationDto GetConfiguration();
    }
}
