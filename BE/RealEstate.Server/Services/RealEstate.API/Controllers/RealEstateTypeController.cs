using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RealEstate.ApplicationBase.Common;
using RealEstate.ApplicationService.PostModule.Abstracts;
using RealEstate.ApplicationService.PostModule.Dtos;
using RealEstate.Utils;
using WebAPIBase.Controller;

namespace RealEstate.API.Controllers
{
    [Route("api/real-estate-type")]
    [ApiController]
    public class RealEstateTypeController : ApiControllerBase
    {
        private IRealEstateTypeService _realEstateTypeService;
        public RealEstateTypeController(IRealEstateTypeService realEstateTypeService) {
            _realEstateTypeService = realEstateTypeService;
        }
        /// <summary>
        /// Danh sách loại bất động sản 
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        [HttpGet("find-all")]
        public ApiResponse<PagingResult<RealEstateTypeDto>> GetAll([FromQuery]PagingRequestBaseDto input)
        {
            return new(_realEstateTypeService.FindAll(input));
        }
    }
}
