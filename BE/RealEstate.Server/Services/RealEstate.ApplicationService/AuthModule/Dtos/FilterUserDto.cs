using Microsoft.AspNetCore.Mvc;
using RealEstate.ApplicationBase.Common;

namespace RealEstate.ApplicationService.AuthModule.Dtos
{
    public class FilterUserDto : PagingRequestBaseDto
    {
        [FromQuery(Name = "username")]
        public string? Username { get; set; }
        [FromQuery(Name = "fullname")]
        public string? FullName { get; set; }
        [FromQuery(Name = "status")]
        public int? Status { get; set; }
    }
}
