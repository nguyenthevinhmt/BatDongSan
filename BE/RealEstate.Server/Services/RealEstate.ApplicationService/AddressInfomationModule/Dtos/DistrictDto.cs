using System.ComponentModel.DataAnnotations;

namespace RealEstate.ApplicationService.AddressInfomationModule.Dtos
{
    public class DistrictDto
    {
        public int Id { get; set; }
        /// <summary>
        /// Code
        /// </summary>
        [MaxLength(20)]
        public string Code { get; set; } = null!;
        /// <summary>
        /// Tên quận/huyện
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
        /// Có phường xã hay không
        /// </summary>
        public bool IsHaveWard { get; set; }
    }
}
