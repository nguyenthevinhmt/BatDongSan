namespace RealEstate.ApplicationService.WalletModule.Dtos.VnpayDto
{
    public class PaymentRequestDto
    {
        /// <summary>
        /// Mã ví điện tử cá nhân
        /// </summary>
        public int WalletId {  get; set; }
        /// <summary>
        /// Số tiền giao dịch
        /// </summary>
        public double TransactionAmount {  get; set; }
        /// <summary>
        /// Chỉ nhận các giá trị 
        /// vnp_BankCode=VNPAYQR: Thanh toán quét mã QR
        /// vnp_BankCode=VNBANK: Thẻ ATM - Tài khoản ngân hàng nội địa
        /// vnp_BankCode=INTCARD: Thẻ thanh toán quốc tế
        /// </summary>
        public string BankCode { get; set; } = null!;
    }
}
