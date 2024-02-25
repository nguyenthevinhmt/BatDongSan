using EntitiesBase.Interfaces;
using Microsoft.EntityFrameworkCore;
using RealEstate.Utils.ConstantVariables.Database;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using RealEstate.Utils.ConstantVariables.Post;

namespace RealEstate.Domain.Entities
{
    [Table(nameof(Post), Schema = DbSchemas.Default)]
    [Index(nameof(Deleted), nameof(ApproveBy), nameof(PostTypeId), nameof(RealEstateTypeId), nameof(UserId), Name = $"IX_{nameof(Post)}")]
    public class Post : IFullAudited
    {
        [Key]
        public int Id { get; set; }
        public string Title { get; set; } = null!;
        public string Description { get; set; } = null!;
        /// <summary>
        /// Tỉnh/Thành phố
        /// </summary>
        [MaxLength(50)]
        public string Province { get; set; } = null!;
        /// <summary>
        /// Quận/huyện
        /// </summary>
        [MaxLength(50)]
        public string Distinct { get; set; } = null!;
        /// <summary>
        /// Phường xã
        /// </summary>
        [MaxLength(50)]
        public string Ward { get; set; } = null!;
        /// <summary>
        /// Số nhà - đường 
        /// </summary>
        public string Street { get; set; } = null!;
        [MaxLength(250)]
        public string? DetailAddress { get; set; }
        /// <summary>
        /// Diện tích
        /// </summary>
        [Range(1, double.MaxValue)]
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
        [MaxLength(250)]
        public string? YoutubeLink { get; set; }
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
        public User User { get; set; } = null!;
        /// <summary>
        /// Loại bài viết
        /// </summary>
        public int PostTypeId { get; set; }
        public PostType PostType { get; set; } = null!;
        /// <summary>
        /// Loại bất động sản
        /// </summary>
        public int RealEstateTypeId { get; set; }
        public RealEstateType RealEstateType { get; set; } = null!;
        public List<Favorite>? Favorites { get; set; }
        public List<Media>? Medias { get; set; }
        #region audit
        public DateTime? CreatedDate { get; set; }
        public int? CreatedBy { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public int? ModifiedBy { get; set; }
        public bool Deleted { get; set; }
        #endregion
    }
}
