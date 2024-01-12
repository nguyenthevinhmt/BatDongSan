using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RealEstate.ApplicationBase.Common.Validations
{
    public class FileMaxLengthAttribute : ValidationAttribute
    {
        private long MaxLength { get; set; }

        protected override ValidationResult? IsValid(object? value, ValidationContext validationContext)
        {
            if (value == null)
                return ValidationResult.Success;

            if (value is not IFormFile file)
            {
                throw new InvalidCastException("Field is not instance of IFormFile");
            }

            MaxLength = validationContext.GetFileMaxLength();

            if (file.Length <= MaxLength)
            {
                return ValidationResult.Success;
            }

            //var msg = $"File có kích thước phải nhỏ hơn hoặc bằng 1 MB";
            ErrorMessage = validationContext.Localize("error_validation_FileMaxLength");
            var msg = string.Format(ErrorMessage, MaxLength / 1024.0 / 1024.0);
            return new ValidationResult(msg);
        }
    }
}
