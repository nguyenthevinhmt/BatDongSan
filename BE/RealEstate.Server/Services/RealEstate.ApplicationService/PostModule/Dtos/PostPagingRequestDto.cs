using Microsoft.AspNetCore.Mvc;
using RealEstate.ApplicationBase.Common;

namespace RealEstate.ApplicationService.PostModule.Dtos
{
    public class PostPagingRequestDto : PagingRequestBaseDto
    {
        /// <summary>
        /// Trạng thái bài đăng
        /// </summary>
        [FromQuery(Name = "status")]
        public int? PostStatus {  get; set; }
        /// <summary>
        /// Loại bài viết
        /// </summary>
        [FromQuery(Name = "postType")]
        public int? PostType {  get; set; }
        /// <summary>
        /// Loại bất động sản
        /// </summary>
        [FromQuery(Name = "realEstateType")]
        public int? RealEstateType {  get; set; }
    }
}
