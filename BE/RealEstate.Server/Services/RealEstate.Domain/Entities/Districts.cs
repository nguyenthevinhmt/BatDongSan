using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace RealEstate.Domain.Entities
{
    /// <summary>
    /// Quản lý địa chỉ cấp Quận/Huyện
    /// </summary>
    public class Districts
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        /// <summary>
        /// Mã Code
        /// </summary>
        [MaxLength(20)]
        public string Code { get; set; } = null!;
        /// <summary>
        /// Tên
        /// </summary>
        [MaxLength(256)]
        public string Name { get; set; } = null!;
        /// <summary>
        /// Tên tiếng anh
        /// </summary>
        [MaxLength(256)]
        public string? NameEn { get; set; }
        /// <summary>
        /// Tên đầy đủ
        /// </summary>
        [MaxLength(256)]
        public string FullName { get; set; } = null!;
        /// <summary>
        /// Tên đầy đủ (Tiếng Anh)
        /// </summary>
        [MaxLength(256)]
        public string? FullNameEn { get; set; }
        /// <summary>
        /// Tên mã Code
        /// </summary>
        [MaxLength(256)]
        public string? CodeName { get; set; }
        /// <summary>
        /// Id tỉnh/Thành phố
        /// </summary>
        [MaxLength(20)]
        public int ProvinceId { get; set; }
        /// <summary>
        /// Id vùng (Đông nam bộ, tay nam bộ, ...)
        /// </summary>
        public int? AdministrativeUnitId { get; set; }
    }
}
