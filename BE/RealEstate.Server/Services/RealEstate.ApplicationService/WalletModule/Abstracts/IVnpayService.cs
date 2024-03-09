using Microsoft.AspNetCore.Http;
using RealEstate.ApplicationService.WalletModule.Dtos.VnpayDto;

namespace RealEstate.ApplicationService.WalletModule.Abstracts
{
    public interface IVnpayService
    {
        /// <summary>
        /// Tạo đường dẫn nạp tiền
        /// </summary>
        /// <param name="input"></param>
        /// <param name="context"></param>
        /// <returns></returns>
        string CreatePaymentUrl(PaymentRequestDto input, HttpContext context);
    }
}
