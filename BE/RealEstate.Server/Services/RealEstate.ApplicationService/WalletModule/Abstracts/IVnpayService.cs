using Microsoft.AspNetCore.Http;

namespace RealEstate.ApplicationService.WalletModule.Abstracts
{
    public interface IVnpayService
    {
        /// <summary>
        /// Tạo đường dẫn thanh toán
        /// </summary>
        /// <param name="WalletNumber"></param>
        /// <param name="context"></param>
        /// <returns></returns>
        string CreatePaymentUrl(string WalletNumber,HttpContext context);
    }
}
