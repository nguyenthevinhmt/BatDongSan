namespace RealEstate.ApplicationService.PostModule.Dtos
{
    public class PostDto
    {
        public int Id { get; set; }
        public string Title { get; set; } = null!;
        public string Description { get; set; } = null!;
        /// <summary>
        /// Tỉnh/Thành phố
        /// </summary>
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
        /// Ngày hết hạn
        /// </summary>
        public DateTime PostEndDate {  get; set; }
        /// <summary>
        /// Thời gian duyệt
        /// </summary>
        public DateTime? ApproveAt { get; set; }
        /// <summary>
        /// Người duyệt
        /// </summary>
        public int? ApproveBy { get; set; }
        /// <summary>
        /// Trạng thái
        /// <see cref="PostStatuses"/>
        /// </summary>
        public int Status { get; set; }
        public int UserId { get; set; }
        /// <summary>
        /// Loại bài viết
        /// </summary>
        public int PostTypeId { get; set; }
        /// <summary>
        /// Option bài viết
        /// </summary>
        public int Options {  get; set; }
        /// <summary>
        /// Ngày đăng bài
        /// </summary>
        public DateTime PostStartDate {  get; set; }
        /// <summary>
        /// Loại bất động sản
        /// </summary>
        public int RealEstateTypeId { get; set; }
        public DateTime? CreatedDate { get; set; }
        public int? CreatedBy { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public int? ModifiedBy { get; set; }
        public string? FirstImageUrl { get;set; }


    }
}
