﻿using EntitiesBase.Interfaces;
using Microsoft.EntityFrameworkCore;
using RealEstate.Utils.ConstantVariables.Database;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using RealEstate.Utils.ConstantVariables.Post;
using RealEstate.ApplicationBase.Common.Validations;

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
        public string District { get; set; } = null!;
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
        /// Đơn vị 
        /// </summary>
        public int CalculateType { get; set; }
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
        /// <summary>
        /// Option cho bài viết (thường, bạc, vàng, kim cương)
        /// <see cref="PostOptions"/>
        /// </summary>
        [IntegerRange(AllowableValues = new int[] { PostOptions.NORMAL, PostOptions.SILVER, PostOptions.GOLD, PostOptions.DIAMOND })]
        public int Options { get; set; }
        /// <summary>
        /// Id off show post backgroud job
        /// </summary>
        [MaxLength(256)]
        public string? BackgroundJobOffShowPostId { get; set; }
        /// <summary>
        /// Id show on bgj
        /// </summary>
        [MaxLength(256)]
        public string? BackgroundJobOnShowPostId { get; set; }
        /// <summary>
        /// Ngày bắt đầu đăng bài
        /// </summary>
        public DateTime PostStartDate { get; set; }
        /// <summary>
        /// Ngày kết thúc đăng bài
        /// </summary>
        public DateTime PostEndDate { get; set; }
        /// <summary>
        /// Số ngày đăng bài
        /// </summary>
        public int LifeTime { get; set; }
        /// <summary>
        /// Check thanh toán
        /// </summary>
        public bool IsPayment { get; set; }
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
