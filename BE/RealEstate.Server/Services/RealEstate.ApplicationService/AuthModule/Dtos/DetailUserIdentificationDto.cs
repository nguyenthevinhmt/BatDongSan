using System.ComponentModel.DataAnnotations;

namespace RealEstate.ApplicationService.AuthModule.Dtos
{
    public class DetailUserIdentificationDto : UserIdentificationDto
    {
        /// <summary>
        /// Họ tên
        /// </summary>
        public string Fullname { get; set; } = null!;
        /// <summary>
        /// Ngày sinh
        /// </summary>
        public DateTime DateOfBirth { get; set; }
        /// <summary>
        /// Giới tính
        /// </summary>
        public string Sex { get; set; } = null!;
        /// <summary>
        /// Quốc tịch
        /// </summary>
        public string Nationality { get; set; } = null!;
        /// <summary>
        /// Quê quán
        /// </summary>
        public string PlaceOfOrigin { get; set; } = null!;
        /// <summary>
        /// Nơi thường trú
        /// </summary>
        public string PlaceOfResidence { get; set; } = null!;
        /// <summary>
        /// Ngày hết hạn
        /// </summary>
        public DateTime IdIssueExpDate { get; set; }
        /// <summary>
        /// Ngày cấp thẻ
        /// </summary>
        public DateTime IdDate { get; set; }
        /// <summary>
        /// Nơi cấp
        /// </summary>
        public string IdIssuer { get; set; } = null!;
    }
}
