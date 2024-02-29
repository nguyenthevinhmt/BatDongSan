using Microsoft.AspNetCore.Mvc;
using RealEstate.ApplicationBase.Common;
using RealEstate.ApplicationService.PostModule.Abstracts;
using RealEstate.ApplicationService.PostModule.Dtos;
using RealEstate.Utils;
using WebAPIBase.Controller;

namespace RealEstate.API.Controllers
{
    [Route("api/post")]
    [ApiController]
    public class PostController : ApiControllerBase
    {
        private readonly IPostService _postService;

        public PostController(IPostService postService)
        {
            _postService = postService;
        }
        /// <summary>
        /// Danh sách bài viết
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        [HttpGet("find-all")]
        public ApiResponse<PagingResult<PostDto>> FindAll([FromQuery]PostPagingRequestDto input)
        {
            return new(_postService.FindAllPost(input));
        }
        /// <summary>
        /// Danh sách bài viết cá nhân
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>

        [HttpGet("personal/find-all")]
        public ApiResponse<PagingResult<PostDto>> FindAllByUserId([FromQuery] PostPagingRequestDto input)
        {
            return new(_postService.FindAllPostByUserId(input));
        }

        /// <summary>
        /// Chi tiết bài viết
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet("find-by-id")]
        public ApiResponse<PostDetailDto> FindById(int id)
        {
            return new(_postService.FindById(id));
        }

        /// <summary>
        /// Tạo mới bài viết
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        [HttpPost("add")]
        public ApiResponse CreatePost([FromForm]CreatePostDto input)
        {
            _postService.CreatePost(input);
            return new();
        }

        /// <summary>
        /// Xóa bài viết
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpDelete("remove")]
        public ApiResponse DeletePost(int id)
        {
            _postService.Delete(id);
            return new();
        }

        /// <summary>
        /// Cập nhật bài viết
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        [HttpPut("update")]
        public ApiResponse<PostDetailDto> Update([FromForm]UpdatePostDto input)
        {
            return new(_postService.Update(input));
        }
    }
}
