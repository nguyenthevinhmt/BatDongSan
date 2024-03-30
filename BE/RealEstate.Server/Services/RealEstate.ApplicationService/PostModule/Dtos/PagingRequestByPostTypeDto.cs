using RealEstate.ApplicationBase.Common;

namespace RealEstate.ApplicationService.PostModule.Dtos
{
    public class PagingRequestByPostTypeDto : PagingRequestBaseDto
    {
        /// <summary>
        /// Id người dùng
        /// </summary>
        public int UserId {  get; set; }
        /// <summary>
        /// Loại bài đăng
        /// </summary>
        public int PostType {  get; set; }
    }
}
