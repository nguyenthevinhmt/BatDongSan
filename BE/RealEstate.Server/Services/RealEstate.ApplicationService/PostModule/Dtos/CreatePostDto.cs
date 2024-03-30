using RealEstate.ApplicationBase.Common.Validations;
using RealEstate.Utils.ConstantVariables.Post;

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
        private string _district = null!;
        /// <summary>
        /// Quận/huyện
        /// </summary>
        [CustomMaxLength(50)]
        public string District
        {
            get => _district;
            set => _district = value.Trim();
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
        [IntegerRange(AllowableValues = new int[] {PostOptions.NORMAL, PostOptions.SILVER, PostOptions.GOLD, PostOptions.DIAMOND })]
        public int Options {  get; set; }
        /// <summary>
        /// Số ngày đăng bài 
        /// </summary>
        public int LifeTime { get; set; }
        /// <summary>
        /// Loại bài viết
        /// </summary>
        public int PostTypeId { get; set; }

        /// <summary>
        /// Loại bất động sản
        /// </summary>
        public int RealEstateTypeId { get; set; }
        /// <summary>
        /// Đơn vị
        /// <see cref="RealEstate.Utils.ConstantVariables.Post.CalculateType"/>
        /// </summary>
        [IntegerRange(AllowableValues = new int[]
        {
            Utils.ConstantVariables.Post.CalculateType.VND,
            Utils.ConstantVariables.Post.CalculateType.PriceOfSquareMeter,
            Utils.ConstantVariables.Post.CalculateType.Agree
        })]
        public int CalculateType { get; set; }

        public List<CreateMediaDto>? ListMedia { get; set; }
    }
}
