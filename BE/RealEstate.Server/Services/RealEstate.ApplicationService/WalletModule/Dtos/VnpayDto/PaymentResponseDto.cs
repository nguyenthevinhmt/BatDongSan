namespace RealEstate.ApplicationService.WalletModule.Dtos.VnpayDto
{
    public class PaymentResponseDto
    {
        public string OrderInfo { get; set; } = null!;
        public string TransactionId { get; set; } = null!;
        public string OrderId { get; set; } = null!;
        public int PaymentMethod { get; set; }
        public string PaymentId { get; set; } = null!;
        public bool Success { get; set; }
        public string Token { get; set; } = null!;
        public string VnPayResponseCode { get; set; } = null!;
    }
}
