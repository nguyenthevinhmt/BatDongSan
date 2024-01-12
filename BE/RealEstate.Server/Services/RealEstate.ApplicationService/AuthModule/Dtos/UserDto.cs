namespace RealEstate.ApplicationService.AuthModule.Dtos
{
    public class UserDto
    {
        /// <summary>
        /// Id
        /// </summary>
        public int Id { get; set; }

        /// <summary>
        /// Tên đăng nhập
        /// </summary>
        public string Username { get; set; } = null!;

        /// <summary>
        /// Mật khẩu
        /// </summary>
        public string Password { get; set; } = null!;

        /// <summary>
        /// Email
        /// </summary>
        public string Email { get; set; } = null!;

        /// <summary>
        /// Số điện thoại
        /// </summary>
        public string Phone { get; set; } = null!;

        /// <summary>
        /// Tên người dùng
        /// </summary>
        public string FullName { get; set; } = null!;

        /// <summary>
        /// Trạng thái tài khoản
        /// </summary>
        public int Status { get; set; }

        /// <summary>
        /// Loại tài khoản
        /// </summary>
        public int UserType { get; set; }
    }
}
