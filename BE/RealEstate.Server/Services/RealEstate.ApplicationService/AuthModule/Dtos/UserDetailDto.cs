using RealEstate.Utils.ConstantVariables.User;

namespace RealEstate.ApplicationService.AuthModule.Dtos
{
    public class UserDetailDto
    {
        public int Id { get; set; }
        /// <summary>
        /// Tên người dùng
        /// </summary>
        public string? Username {  get; set; }
        /// <summary>
        /// Họ tên
        /// </summary>
        public string? Fullname {  get; set; }
        public string? Email { get; set; }
        /// <summary>
        /// Email
        /// </summary>
        public string? PhoneNumber {  get; set; }
        /// <summary>
        /// Trạng thái tài khoản
        /// <see cref="UserStatus"/>
        /// </summary>
        public int Status {  get; set; }
        /// <summary>
        /// Loại tài khoản
        /// <see cref="UserTypes"/>
        /// </summary>
        public int UserType {  get; set; }
        /// <summary>
        /// Đã xác thực giấy tờ chưa
        /// </summary>
        public bool isConfirm {  get; set; }
    }
}
