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
        int CreatePost(CreatePostDto input);
        /// <summary>
        /// Danh sách bài viết
        /// </summary>
        /// <returns></returns>
        PagingResult<PostDto> FindAllPost(PostPagingRequestDto input);
        /// <summary>
        /// Danh sách bài viết dành cho bạn
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        PagingResult<PostDto> FindAllPublic(PostPagingRequestDto input);
        /// <summary>
        /// Chi tiết bài viết
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        PostDetailDto FindById(int id);
        /// <summary>
        /// Chi tiết bài viết trang chủ
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        PostDetailInHome FindByIdInHome(int id);
        /// <summary>
        /// Cập nhật bài viết
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        PostDetailDto Update(UpdatePostDto input);
        /// <summary>
        /// Cập nhật trạng thái thanh toán bài viết
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        void UpdatePaymentStatus(UpdatePaymentStatusDto input);
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
        /// Hủy duyệt bài
        /// </summary>
        /// <param name="id"></param>
        void CancelRequest(int id);
        /// <summary>
        /// Danh sách bài viết cá nhân 
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        PagingResult<PostDto> FindAllPostByUserId(PostPagingRequestDto input);
        /// <summary>
        /// Đăng bài
        /// </summary>
        void PublishPost(PublishPostDto input);
        /// <summary>
        /// Gỡ bài
        /// </summary>
        /// <param name="id"></param>
        void ShowOffPost(int id);
        /// <summary>
        /// Kích hoạt đăng bài
        /// </summary>
        /// <param name="id"></param>
        void ShowOnPost(int id);
        /// <summary>
        /// Duyệt bài
        /// </summary>
        /// <param name="id"></param>
        void ApprovePost(int id);
        /// <summary>
        /// Yêu cầu phê duyệt
        /// </summary>
        /// <param name="id"></param>
        void RequestApprovePost(int id);
        /// <summary>
        /// Xóa ảnh
        /// </summary>
        /// <param name="id"></param>
        void deleteImage(int id);
        /// <summary>
        /// Danh sách bài viết mới nhất
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        PagingResult<PostDto> FindAllPostNewest(PagingRequestBaseDto input);
        /// <summary>
        /// Danh sách bài viết theo tỉnh thành
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        PagingResult<PostDto> FindAllPostByProvince(PagingRequestBaseDto input);
        /// <summary>
        /// Tìm kiếm post trang chủ
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        PagingResult<PostDto> SearchPost(SearchPostRequestDto input);
    }
}
