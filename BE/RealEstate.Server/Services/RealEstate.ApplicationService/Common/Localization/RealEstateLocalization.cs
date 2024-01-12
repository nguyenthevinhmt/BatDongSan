using Microsoft.AspNetCore.Http;
using RealEstate.ApplicationBase.Localization;
namespace RealEstate.ApplicationService.Common.Localization
{
    public class RealEstateLocalization : LocalizationBase
    {
        public RealEstateLocalization(IHttpContextAccessor httpContextAccessor) : base(httpContextAccessor, "RealEstate.Application.Common.Localization.SourceFiles")
        {
        }
    }
}
