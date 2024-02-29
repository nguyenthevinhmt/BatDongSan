using RealEstate.ApplicationBase.Common;
using RealEstate.ApplicationService.PostModule.Dtos;

namespace RealEstate.ApplicationService.PostModule.Abstracts
{
    public interface IPostService
    {
        /// <summary>
        /// Thêm mới bài đăng
        /// </summary>
        /// <param name="input"></param>
        void CreatePost(CreatePostDto input);
        /// <summary>
        /// Danh sách bài viết
        /// </summary>
        /// <returns></returns>
        PagingResult<PostDto> FindAllPost(PostPagingRequestDto input);
        /// <summary>
        /// Chi tiết bài viết
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        PostDetailDto FindById(int id);
        /// <summary>
        /// Cập nhật bài viết
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        PostDetailDto Update(UpdatePostDto input);
        /// <summary>
        /// Xóa bài viết
        /// </summary>
        /// <param name="id"></param>
        void Delete(int id);
        /// <summary>
        /// Cập nhật trạng thái bài viết
        /// </summary>
        /// <param name="input"></param>
        void UpdateStatus(UpdatePostStatusDto input);
        /// <summary>
        /// Danh sách bài viết cá nhân 
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        PagingResult<PostDto> FindAllPostByUserId(PostPagingRequestDto input);
    }
}
