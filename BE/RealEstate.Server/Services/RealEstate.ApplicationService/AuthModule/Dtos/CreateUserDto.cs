namespace RealEstate.ApplicationService.AuthModule.Dtos
{
    public class CreateUserDto
    {
        /// <summary>
        /// Tên đăng nhập
        /// </summary>
        private string _username = null!;
        public string Username
        {
            get => _username;
            set => _username = value.Trim();
        }

        /// <summary>
        /// Mật khẩu
        /// </summary>
        private string _password = null!;
        public string Password
        {
            get => _password;
            set => _password = value.Trim();
        }

        /// <summary>
        /// Email
        /// </summary>
        private string _email = null!;
        public string Email
        {
            get => _email;
            set => _email = value.Trim();
        }

        /// <summary>
        /// Số điện thoại
        /// </summary>
        private string _phone = null!;
        public string Phone
        {
            get => _phone;
            set => _phone = value.Trim();
        }


        /// <summary>
        /// Tên người dùng
        /// </summary>
        private string _fullName = null!;
        public string FullName
        {
            get => _fullName;
            set => _fullName = value.Trim();
        }


        /// <summary>
        /// Loại tài khoản
        /// </summary>
        public int UserType { get; set; }
        public int Status { get; set; }
    }
}
