using Microsoft.AspNetCore.Http;
using RealEstate.Utils.Localization;

namespace RealEstate.ApplicationService.Common.Localization
{
    public class RealEstateLocalization : LocalizationBase
    {
        public RealEstateLocalization(IHttpContextAccessor httpContextAccessor) : base(httpContextAccessor, "RealEstate.ApplicationService.Common.Localization.SourceFiles")
        {
        }
    }
}
