namespace RealEstate.ApplicationService.WalletModule.Dtos
{
    public class WithdrawDto
    {
        /// <summary>
        /// Mã số ví
        /// </summary>
        public string WalletNumber { get; set; } = null!;
        /// <summary>
        /// Số tiền nạp
        /// </summary>
        public double TransactionAmount { get; set; }
        /// <summary>
        /// Chuyển đến 
        /// </summary>
        public string TransactionTo { get; set; } = null!;
    }
}
