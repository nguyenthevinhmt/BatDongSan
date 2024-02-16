namespace RealEstate.ApplicationService.WalletModule.VnpayLib
{
    public class VnpaySetting
    {
        public string Version { get; set; } = null!;
        public string TmnCode { get; set; } = null!;
        public string HashSecret { get; set; } = null!;
        public string BaseUrl { get; set; } = null!;
        public string Command { get; set; } = null!;
        public string CurrCode { get; set; } = null!;
        public string Locale { get; set; } = null!;
        public string BankCode { get; set; } = null!;
    }
}
