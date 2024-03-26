namespace RealEstate.ApplicationService.AuthModule.Dtos
{
    public class UserIdentificationDto
    {
        public int Id { get; set; }
        /// <summary>
        /// Mã số giấy tờ
        /// </summary>
        public string IdNo { get; set; } = null!;
        /// <summary>
        /// URL Mặt trước
        /// </summary>
        public string FrontImageUrl { get; set; } = null!;
        /// <summary>
        /// URL mặt sau
        /// </summary>
        public string BackwardImageUrl { get; set; } = null!;
    }
}
