namespace RealEstate.ApplicationService.AuthModule.Dtos
{
    public class CreateUserIdentificationDto
    {
        public int Id { get; set; }
        /// <summary>
        /// Mã số giấy tờ
        /// </summary>
        public string IdNo { get; set; } = null!;
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
        /// Nơi thương trú
        /// </summary>
        public string PlaceOfResidence { get; set; } = null!;
        /// <summary>
        /// Ngày hết hạn
        /// </summary>
        public DateTime IdIssueExpDate { get; set; }
        /// <summary>
        /// Ngày phát hành
        /// </summary>
        public DateTime IdDate { get; set; }
        /// <summary>
        /// Nơi phát
        /// </summary>
        public string IdIssuer { get; set; } = null!;
        /// <summary>
        /// Id người dùng
        /// </summary>
        public int UserId { get; set; }
        /// <summary>
        /// URL ảnh mặt trước 
        /// </summary>
        public string FrontUserIdentification { get; set; } = null!;
        /// <summary>
        /// URL ảnh mặt sau
        /// </summary>
        public string BackwardUserIdentification { get; set; } = null!;
    }
}
