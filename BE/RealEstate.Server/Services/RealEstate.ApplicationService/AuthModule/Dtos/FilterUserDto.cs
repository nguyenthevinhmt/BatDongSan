using Microsoft.AspNetCore.Mvc;
using RealEstate.ApplicationBase.Common;
using System.Runtime.CompilerServices;

namespace RealEstate.ApplicationService.AuthModule.Dtos
{
    public class FilterUserDto : PagingRequestBaseDto
    {
        private string? _username;
        [FromQuery(Name = "username")]
        public string? Username {
            get => _username;
            set => _username = value?.Trim();
        }
        private string? _fullname;
        [FromQuery(Name = "fullname")]
        public string? FullName {
            get => _fullname;
            set => _fullname = value?.Trim();
        }
        [FromQuery(Name = "status")]
        public int? Status { get; set; }
        private string? _phoneNumber;
        public string? PhoneNumber {
            get => _phoneNumber;
            set => _phoneNumber = value?.Trim();
        }
    }
}
