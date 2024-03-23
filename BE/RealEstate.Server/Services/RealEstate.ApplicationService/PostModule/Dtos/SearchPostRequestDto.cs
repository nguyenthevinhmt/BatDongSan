using Microsoft.AspNetCore.Mvc;
using RealEstate.ApplicationBase.Common;

namespace RealEstate.ApplicationService.PostModule.Dtos
{
    public class SearchPostRequestDto : PagingRequestBaseDto
    {
        private string? _province;
        [FromQuery(Name = "province")]
        public string? Province {
            get => _province;
            set => _province = value?.Trim();
        }
        [FromQuery(Name = "realEstateType")]
        public int? RealEstateType { get; set; }
        [FromQuery(Name = "price")]
        public int? Price { get; set; }
        [FromQuery(Name = "area")]
        public double? Area { get; set; }
        /// <summary>
        /// Loại bài viết
        /// </summary>
        public int? PostType {  get; set; }
    }
}
