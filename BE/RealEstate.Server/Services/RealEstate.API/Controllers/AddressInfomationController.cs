using Microsoft.AspNetCore.Mvc;
using RealEstate.ApplicationService.AddressInfomationModule.Abstracts;
using RealEstate.ApplicationService.AddressInfomationModule.Dtos;
using RealEstate.Utils;
using System.Net;
using WebAPIBase.Controller;

namespace RealEstate.API.Controllers
{
    [Route("api/address-infomation")]
    [ApiController]
    public class AddressInfomationController : ApiControllerBase
    {
        private readonly IAddressInfomationService _addressInfomationServices;
        public AddressInfomationController(ILogger<AddressInfomationController> logger, IAddressInfomationService addressInfomationServices)
        {
            _addressInfomationServices = addressInfomationServices;
        }
        /// <summary>
        /// Lấy danh sách các tỉnh/thành phố
        /// </summary>
        /// <returns></returns>
        [HttpGet("province")]
        [ProducesResponseType(typeof(ApiResponse<IEnumerable<ProvinceDto>>), (int)HttpStatusCode.OK)]
        public ApiResponse FindAll()
        {
            return new(_addressInfomationServices.GetAllProvince());
        }

        /// <summary>
        /// Lấy danh sách quận/huyện theo tỉnh thành phố
        /// </summary>
        /// <param name="provinceId">Id tỉnh/thành phố</param>
        /// <returns></returns>
        [HttpGet("district/{provinceId}")]
        [ProducesResponseType(typeof(ApiResponse<IEnumerable<DistrictDto>>), (int)HttpStatusCode.OK)]
        public ApiResponse GetDistrictByProvinceId(int provinceId)
        {
            return new(_addressInfomationServices.GetDistrictByProvinceId(provinceId));
        }

        /// <summary>
        /// Lấy danh sách xã/thị trấn theo quận/huyện
        /// </summary>
        /// <param name="districtId">Id quận/huyện</param>
        /// <returns></returns>
        [HttpGet("ward/{districtId}")]
        [ProducesResponseType(typeof(ApiResponse<IEnumerable<DistrictDto>>), (int)HttpStatusCode.OK)]
        public ApiResponse GetWardByDistrictId(int districtId)
        {
            return new(_addressInfomationServices.GetWardByDistrictId(districtId));
        }
    }
}
