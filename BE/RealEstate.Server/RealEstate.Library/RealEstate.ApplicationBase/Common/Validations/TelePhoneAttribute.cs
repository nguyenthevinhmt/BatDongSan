using Microsoft.IdentityModel.Tokens;
using System.ComponentModel.DataAnnotations;
using System.Text.RegularExpressions;

namespace RealEstate.ApplicationBase.Common.Validations
{
    public class TelePhoneAttribute : ValidationAttribute
    {
        /// <summary>
        /// Chuỗi regex kiểm tra số điện thoại bàn
        /// </summary>
        private readonly string regexPhone = @"^\d{0,11}$";

        protected override ValidationResult? IsValid(object? value, ValidationContext validationContext)
        {
            if (value == null)
                return ValidationResult.Success;

            string phone = value.ToString()!;

            if (phone.IsNullOrEmpty())
            {
                return ValidationResult.Success;
            }

            ErrorMessage = validationContext.Localize("error_validation_TelephoneInvalid");
            if (phone.Length > 11)
            {
                return new ValidationResult(ErrorMessage);
            }

            bool prefixValid = Regex.IsMatch(phone, regexPhone);

            if (!prefixValid)
            {
                return new ValidationResult(ErrorMessage);
            }

            return ValidationResult.Success;
        }
    }
}
