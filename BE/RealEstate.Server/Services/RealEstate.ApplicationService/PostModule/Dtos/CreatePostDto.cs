using RealEstate.ApplicationBase.Common.Validations;
using RealEstate.Domain.Entities;
using RealEstate.Utils.ConstantVariables.Post;
using System.ComponentModel.DataAnnotations;

namespace RealEstate.ApplicationService.PostModule.Dtos
{
    public class CreatePostDto
    {
        private string _title = null!;
        /// <summary>
        /// Tiêu đế
        /// </summary>
        [CustomMaxLength(100)]
        public string Title {  
            get => _title; 
            set => _title = value.Trim();
        }
        private string _description = null!;
        /// <summary>
        /// Mô tả chi tiết
        /// </summary>
        public string Description
        {
            get => _description;
            set => _description = value.Trim();
        }
        private string _province = null!;
        /// <summary>
        /// Tỉnh/ thành phố
        /// </summary>
        [CustomMaxLength(50)]
        public string Province
        {
            get => _province;
            set => _province = value.Trim();
        }
        private string _distinct = null!;
        /// <summary>
        /// Quận/huyện
        /// </summary>
        [CustomMaxLength(50)]
        public string Distinct
        {
            get => _distinct;
            set => _distinct = value.Trim();
        }
        private string _ward = null!;
        /// <summary>
        /// Phường xã
        /// </summary>
        [CustomMaxLength(50)]
        public string Ward
        {
            get => _ward;
            set => _ward = value.Trim();
        }
        private string _street = null!;
        [CustomMaxLength(50)]
        public string Street
        {
            get => _street;
            set => _street = value.Trim();
        }
        private string? _detailAddress;
        [CustomMaxLength(250)]
        public string? DetailAddress {
            get => _detailAddress;
            set => _detailAddress = value?.Trim();
        }
        /// <summary>
        /// Diện tích
        /// </summary>
        public double Area { get; set; }
        /// <summary>
        /// Giá cho thuê/bán
        /// </summary>
        public double? Price { get; set; }
        /// <summary>
        /// Đối tượng cho thuê
        /// </summary>
        public double? RentalObject { get; set; }
        private string? _youtubeLink;
        /// <summary>
        /// Link video youtube
        /// </summary>
        [MaxLength(250)]
        public string? YoutubeLink {
            get => _youtubeLink;
            set => _youtubeLink = value?.Trim();
        }
        /// <summary>
        /// Loại bài viết
        /// </summary>
        public int PostTypeId { get; set; }
        
        /// <summary>
        /// Loại bất động sản
        /// </summary>
        public int RealEstateTypeId { get; set; }

        public List<Media> ListMedia { get; set; } = new();
    }
}
