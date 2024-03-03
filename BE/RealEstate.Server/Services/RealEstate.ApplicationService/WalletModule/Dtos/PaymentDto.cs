namespace RealEstate.ApplicationService.WalletModule.Dtos
{
    public class PaymentDto
    {
        /// <summary>
        /// Mã ví
        /// </summary>
        public string WalletNumber { get; set; } = null!;
        /// <summary>
        /// Số tiền thanh toán 
        /// </summary>
        public double TransactionAmount { get; set; }
        /// <summary>
        /// Số giao dịch
        /// </summary>
        public string TransactionNumber { get; set; } = null!;
    }
}
