using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using RealEstate.ApplicationBase;
using RealEstate.Infrastructure.Persistence;
using RealEstate.Utils.Localization;

namespace RealEstate.ApplicationService.Common
{
    public abstract class ServiceBase : ServiceBase<RealEstateDbContext>
    {
        protected ServiceBase(ILogger logger, IHttpContextAccessor httpContext) : base(logger, httpContext)
        {
        }

        protected ServiceBase(ILogger logger, IHttpContextAccessor httpContext, RealEstateDbContext dbContext, LocalizationBase localize, IMapper mapper) 
                    : base(logger, httpContext, dbContext, localize, mapper)
        {
        }
    }
}
