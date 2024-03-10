using RealEstate.Domain.Entities;
using RealEstate.Utils.ConstantVariables.Post;

namespace RealEstate.ApplicationService.PostModule.Dtos
{
    public class PostDetailDto
    {
        public int Id { get; set; }
        public string Title { get; set; } = null!;
        public string Description { get; set; } = null!;
        public string Province { get; set; } = null!;
        /// <summary>
        /// Quận/huyện
        /// </summary>
        public string District { get; set; } = null!;
        /// <summary>
        /// Phường xã
        /// </summary>
        public string Ward { get; set; } = null!;
        /// <summary>
        /// Số nhà - đường 
        /// </summary>
        public string Street { get; set; } = null!;
        /// <summary>
        /// Chi tiết địa chỉ
        /// </summary>
        public string? DetailAddress { get; set; }
        /// <summary>
        /// Diện tích
        /// </summary>
        public double Area { get; set; }
        /// <summary>
        /// Giá cho thuê/bán
        /// </summary>
        public double? Price { get; set; }
        /// <summary>
        /// Đối tượng cho thuê
        /// </summary>
        public double? RentalObject { get; set; }
        /// <summary>
        /// Link video youtube
        /// </summary>
        public string? YoutubeLink { get; set; }
        /// <summary>
        /// Trạng thái
        /// <see cref="PostStatuses"/>
        /// </summary>
        public int Status { get; set; }
        /// <summary>
        /// Loại bài viết
        /// </summary>
        public int PostTypeId { get; set; }
        /// <summary>
        /// Loại bất động sản
        /// </summary>
        public int RealEstateTypeId { get; set; }
        public List<Media> Medias { get; set; } = new();
    }
}
