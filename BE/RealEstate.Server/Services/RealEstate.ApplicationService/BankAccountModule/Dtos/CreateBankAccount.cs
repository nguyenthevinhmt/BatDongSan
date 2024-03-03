using RealEstate.ApplicationBase.Common.Validations;

namespace RealEstate.ApplicationService.BankAccountModule.Dtos
{
    public class CreateBankAccount
    {
        /// <summary>
        /// Tên ngân hàng
        /// </summary>
        [CustomMaxLength(50)]
        public string BankName { get; set; } = null!;
        /// <summary>
        /// Số tài khoản
        /// </summary>
        [CustomMaxLength(50)]
        public string BankCode { get; set; } = null!;
        /// <summary>
        /// Họ tên chủ tài khoản
        /// </summary>
        [CustomMaxLength(30)]
        public string OwnerBankFullname {  get; set; } = null!;
        public DateTime ReleaseDate { get; set; }
    }
}
