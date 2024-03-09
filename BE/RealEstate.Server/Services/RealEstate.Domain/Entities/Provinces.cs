using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace RealEstate.Domain.Entities
{
    /// <summary>
    /// Tỉnh/Thành phố
    /// </summary>
    public class Provinces
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
        /// Tên tỉnh/thành phố
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
        /// Tên đầy đủ tiếng anh
        /// </summary>
        [MaxLength(256)]
        public string? FullNameEn { get; set; }
        /// <summary>
        /// Tên mã code
        /// </summary>
        [MaxLength(256)]
        public string? CodeName { get; set; }
        /// <summary>
        /// ID vùng
        /// </summary>
        public int? AdministrativeUnitId { get; set; }
        /// <summary>
        /// ID loại thành phố
        /// </summary>
        public int? AdministrativeRegionId { get; set; }
    }
}
