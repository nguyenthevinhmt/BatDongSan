using Microsoft.AspNetCore.Mvc;
using RealEstate.ApplicationBase.Common;

namespace RealEstate.ApplicationService.PostModule.Dtos
{
    public class PagingPostByProvinceRequestDto : PagingRequestBaseDto
    {
        private string? _province;
        [FromQuery(Name = "province")]
        public string? Province {
            get => _province;
            set => _province = value?.Trim();
        }
    }
}
