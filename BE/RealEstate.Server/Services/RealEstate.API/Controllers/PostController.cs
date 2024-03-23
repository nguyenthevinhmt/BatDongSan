﻿using Microsoft.AspNetCore.Mvc;
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
        /// Chi tiết bài đăng trang chủ
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet("home/find-by-id")]
        public ApiResponse<PostDetailInHome> FindByIdInHome(int id)
        {
            return new(_postService.FindByIdInHome(id));
        }

        /// <summary>
        /// Tạo mới bài viết
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        [HttpPost("add")]
        public ApiResponse CreatePost([FromBody]CreatePostDto input)
        {
            return new(_postService.CreatePost(input));
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
        public ApiResponse<PostDetailDto> Update([FromBody]UpdatePostDto input)
        {
            return new(_postService.Update(input));
        }
        /// <summary>
        /// Đăng lại bài viết đã hết hạn/bị gỡ
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        [HttpPut("republish-post")]
        public ApiResponse ReShowPost(PublishPostDto input)
        {
            _postService.PublishPost(input);
            return new();
        }
        /// <summary>
        /// Phê duyệt bài viết
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpPut("approve")]
        public ApiResponse Approve(int id)
        {
            _postService.ApprovePost(id);
            return new();
        }
        /// <summary>
        /// Yêu cầu phê duyệt
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpPut("request-approve")]
        public ApiResponse RequestPost(int id)
        {
            _postService.RequestApprovePost(id);
            return new();
        }
        /// <summary>
        /// Cập nhật trạng thái thanh toán 
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        [HttpPut("update-payment-status")]
        public ApiResponse UpdatePaymentStatus(UpdatePaymentStatusDto input)
        {
            _postService.UpdatePaymentStatus(input);
            return new();
        }
        /// <summary>
        /// cập nhật trạng thái bài đăng
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        [HttpPut("update-status")]
        public ApiResponse UpdateStatus(UpdatePostStatusDto input)
        {
            _postService.UpdateStatus(input);
            return new();
        }
        /// <summary>
        /// Danh sách tin dành cho bạn
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        [HttpGet("public/find-all")]
        public ApiResponse<PagingResult<PostDto>> FindAllPublic([FromQuery]PostPagingRequestDto input)
        {
            return new(_postService.FindAllPublic(input));
        }
        /// <summary>
        /// xóa ảnh
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpDelete("delete-image")]
        public ApiResponse DeleteImage(int id)
        {
            _postService.deleteImage(id);
            return new();
        }

        /// <summary>
        /// Danh sách bài viết mới nhất
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        [HttpGet("find-all-newest")]
        public ApiResponse<PagingResult<PostDto>> FindAllPostNewest([FromQuery]PagingRequestBaseDto input)
        {
            return new(_postService.FindAllPostNewest(input));
        }
        /// <summary>
        /// Tìm kiếm bất động sản theo tỉnh thành
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        [HttpGet("find-all-by-province")]
        public ApiResponse<PagingResult<PostDto>> FindAllPostByProvince([FromQuery] PagingRequestBaseDto input)
        {
            return new(_postService.FindAllPostByProvince(input));
        }
        /// <summary>
        /// Tìm kiếm bài viết trang chủ
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        [HttpGet("search-post")]
        public ApiResponse<PagingResult<PostDto>> SearchPost([FromQuery] SearchPostRequestDto input)
        {
            return new(_postService.SearchPost(input));
        }

        /// <summary>
        /// Hủy duyệt bài
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpPut("cancel-request")]
        public ApiResponse CancelRequest(int id)
        {
            _postService.CancelRequest(id);
            return new();
        }
    }
}
