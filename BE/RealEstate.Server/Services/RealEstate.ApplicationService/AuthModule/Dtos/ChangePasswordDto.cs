using RealEstate.ApplicationBase.Common.Validations;

namespace RealEstate.ApplicationService.AuthModule.Dtos
{
    public class ChangePasswordDto
    {
        private string _oldPassword = null!;
        [CustomMaxLength(128)]
        [CustomRequired(AllowEmptyStrings = false)]
        public string OldPassword
        {
            get => _oldPassword;
            set => _oldPassword = value.Trim();
        }

        private string _newPassword = null!;
        [CustomMaxLength(128)]
        [CustomRequired(AllowEmptyStrings = false)]
        public string NewPassword
        {
            get => _newPassword;
            set => _newPassword = value.Trim();
        }
    }
}
