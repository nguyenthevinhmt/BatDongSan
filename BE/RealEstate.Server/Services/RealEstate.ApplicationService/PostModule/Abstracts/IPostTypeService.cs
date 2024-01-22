using RealEstate.ApplicationBase.Common;
using RealEstate.ApplicationService.PostModule.Dtos;

namespace RealEstate.ApplicationService.PostModule.Abstracts
{
    public interface IPostTypeService
    {
        /// <summary>
        /// Thêm mới loại bài viết
        /// </summary>
        /// <param name="input"></param>
        void CreatePostType(CreatePostTypeDto input);
        /// <summary>
        /// Danh sách loại bài viết
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        PagingResult<PostTypeDto> FindAll(PagingRequestBaseDto input);
        /// <summary>
        /// Xóa bài viết
        /// </summary>
        /// <param name="id"></param>
        void Delete(int id);
    }
}
