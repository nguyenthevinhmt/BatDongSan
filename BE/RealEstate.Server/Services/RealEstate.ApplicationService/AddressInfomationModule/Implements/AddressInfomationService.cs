using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using RealEstate.ApplicationService.AddressInfomationModule.Abstracts;
using RealEstate.ApplicationService.AddressInfomationModule.Dtos;
using RealEstate.ApplicationService.Common;

namespace RealEstate.ApplicationService.AddressInfomationModule.Implements
{
    public class AddressInfomationService : ServiceBase, IAddressInfomationService
    {
        public AddressInfomationService(ILogger<AddressInfomationService> logger, IHttpContextAccessor httpContext) : base(logger, httpContext)
        {
        }

        public IEnumerable<ProvinceDto> GetAllProvince()
        {
            var result = _dbContext.Provinces.Select(e => new ProvinceDto
            {
                Id = e.Id,
                Code = e.Code,
                CodeName = e.CodeName,
                FullName = e.FullName,
                FullNameEn = e.FullNameEn,
                Name = e.Name,
                NameEn = e.NameEn,
            });
            return result;
        }

        public IEnumerable<DistrictDto> GetDistrictByProvinceId(int id)
        {
            var result = _dbContext.Districts.Where(e => e.ProvinceId == id)
                                                 .Select(e => new DistrictDto
                                                 {
                                                     Id = e.Id,
                                                     Code = e.Code,
                                                     CodeName = e.CodeName,
                                                     FullName = e.FullName,
                                                     FullNameEn = e.FullNameEn,
                                                     Name = e.Name,
                                                     NameEn = e.NameEn,
                                                     IsHaveWard = _dbContext.Wards.Any(d => d.DistrictId == e.Id),
                                                 });
            return result;
        }

        public IEnumerable<WardDto> GetWardByDistrictId(int id)
        {
            var result = _dbContext.Wards.Where(e => e.DistrictId == id)
                                                 .Select(e => new WardDto
                                                 {
                                                     Id = e.Id,
                                                     Code = e.Code,
                                                     CodeName = e.CodeName,
                                                     FullName = e.FullName,
                                                     FullNameEn = e.FullNameEn,
                                                     Name = e.Name,
                                                     NameEn = e.NameEn,
                                                 });
            return result;
        }
    }
}
