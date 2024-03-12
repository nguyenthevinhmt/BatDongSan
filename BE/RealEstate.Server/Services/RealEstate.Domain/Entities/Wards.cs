using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace RealEstate.Domain.Entities
{
    /// <summary>
    /// Xã/Thị trấn
    /// </summary>
    public class Wards
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        /// <summary>
        /// Code
        /// </summary>
        [MaxLength(20)]
        public string Code { get; set; } = null!;
        /// <summary>
        /// Tên xã/thị trấn
        /// </summary>
        [MaxLength(256)]
        public string Name { get; set; } = null!;
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
        /// Tên đày đủ tiếng anh
        /// </summary>
        [MaxLength(256)]
        public string? FullNameEn { get; set; }
        /// <summary>
        /// Mã Code
        /// </summary>
        [MaxLength(256)]
        public string? CodeName { get; set; }
        /// <summary>
        /// ID Quận/huyện
        /// </summary>
        [MaxLength(20)]
        public int DistrictId { get; set; }
        /// <summary>
        /// Loại xã/thị trấn
        /// </summary>
        public int? AdministrativeUnitId { get; set; }
    }
}
