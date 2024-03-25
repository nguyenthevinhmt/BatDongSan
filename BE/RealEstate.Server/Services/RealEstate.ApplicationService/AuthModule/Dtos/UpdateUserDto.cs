using RealEstate.ApplicationBase.Common.Validations;
using RealEstate.Utils.ConstantVariables.User;

namespace RealEstate.ApplicationService.AuthModule.Dtos
{
    public class UpdateUserDto
    {
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
        public string Fullname
        {
            get => _fullName;
            set => _fullName = value.Trim();
        }
        /// <summary>
        /// Mã số thuế
        /// </summary>
        public string? TaxCode {  get; set; }
        public string? AvatarUrl {  get; set; }
    }
}
