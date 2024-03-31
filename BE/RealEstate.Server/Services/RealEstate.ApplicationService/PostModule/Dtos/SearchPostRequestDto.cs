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
        [FromQuery(Name = "startPrice")]
        public double? StartPrice { get; set; }
        [FromQuery(Name = "endPrice")]
        public double? EndPrice { get; set; }
        [FromQuery(Name = "startArea")]
        public double? StartArea { get; set; }
        [FromQuery(Name = "endArea")]
        public double? EndArea { get; set; }
        /// <summary>
        /// Loại bài viết
        /// </summary>
        public int? PostType {  get; set; }
    }
}
