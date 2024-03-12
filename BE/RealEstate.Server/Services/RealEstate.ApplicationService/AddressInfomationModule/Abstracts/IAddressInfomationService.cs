using RealEstate.ApplicationService.AddressInfomationModule.Dtos;

namespace RealEstate.ApplicationService.AddressInfomationModule.Abstracts
{
    public interface IAddressInfomationService
    {
        IEnumerable<ProvinceDto> GetAllProvince();
        IEnumerable<DistrictDto> GetDistrictByProvinceId(int id);
        IEnumerable<WardDto> GetWardByDistrictId(int id);
    }
}
