using RealEstate.ApplicationBase.Common.Validations;

namespace RealEstate.ApplicationService.WalletModule.Dtos
{
    public class RechargeDto
    {
        /// <summary>
        /// Mã số ví
        /// </summary>
        public string WalletNumber { get; set; } = null!;
        /// <summary>
        /// Số tiền nạp
        /// </summary>
        public double TransactionAmount {  get; set; }
        /// <summary>
        /// Mã giao dịch
        /// </summary>
        public string TransactionNumber { get; set; } = null!;
        /// <summary>
        /// Chuyển từ 
        /// </summary>
        public string TransactionFrom { get; set; } = null!;
    }
}
