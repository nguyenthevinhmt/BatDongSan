using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

namespace RealEstate.Infrastructure.Persistence
{
    public class RealEstateDbContextTransient : RealEstateDbContext
    {
        public RealEstateDbContextTransient(DbContextOptions<RealEstateDbContext> options, IHttpContextAccessor httpContextAccessor) : base(options, httpContextAccessor)
        {
        }
    }
}
