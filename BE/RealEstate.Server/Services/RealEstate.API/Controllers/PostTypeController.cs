using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RealEstate.ApplicationBase.Common;
using RealEstate.ApplicationService.PostModule.Abstracts;
using RealEstate.ApplicationService.PostModule.Dtos;
using RealEstate.ApplicationService.PostModule.Implements;
using RealEstate.Utils;
using WebAPIBase.Controller;

namespace RealEstate.API.Controllers
{
    [Route("api/post-type")]
    [ApiController]
    public class PostTypeController : ApiControllerBase
    {
        private readonly IPostTypeService _postTypeService;

        public PostTypeController(IPostTypeService postTypeService)
        {
            _postTypeService = postTypeService;
        }
        /// <summary>
        /// Danh sách loại bài viết
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        [HttpGet("find-all")]
        public ApiResponse<PagingResult<PostTypeDto>> FindAll([FromQuery]PagingRequestBaseDto input) { 
            return new (_postTypeService.FindAll(input));
        }
    }
}
