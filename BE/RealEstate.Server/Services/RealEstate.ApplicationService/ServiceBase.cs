using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using RealEstate.ApplicationBase;
using RealEstate.Infrastructure.Persistence;

namespace RealEstate.ApplicationService
{
    public abstract class ServiceBase : ServiceBase<RealEstateDbContext>
    {
        protected ServiceBase(ILogger logger, IHttpContextAccessor httpContext) : base(logger, httpContext)
        {
        }
    }
}
