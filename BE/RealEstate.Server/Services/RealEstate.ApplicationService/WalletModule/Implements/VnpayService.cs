using DocumentFormat.OpenXml.Bibliography;
using DocumentFormat.OpenXml.Drawing.Charts;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using RealEstate.ApplicationBase.Common;
using RealEstate.ApplicationService.Common;
using RealEstate.ApplicationService.WalletModule.Abstracts;
using RealEstate.ApplicationService.WalletModule.Dtos.VnpayDto;
using RealEstate.ApplicationService.WalletModule.VnpayLib;
using RealEstate.Domain.Entities;

namespace RealEstate.ApplicationService.WalletModule.Implements
{
    public class VnpayService : ServiceBase, IVnpayService
    {
        private readonly IOptions<VnpaySetting> _appSettings;
        public VnpayService(IOptions<VnpaySetting> appSettings, ILogger<VnpayService> logger, IHttpContextAccessor httpContext) : base(logger, httpContext)
        {
            _appSettings = appSettings;
        }

        public string CreatePaymentUrl(PaymentRequestDto input, HttpContext context)
        {
            var tick = DateTime.Now.Ticks.ToString();
            var pay = new VnpayLibrary();
            var userId = _httpContext.GetCurrentUserId();
            var orderDesc = $"Nap tien vao vi dien tu ca nhan batdongsan.com. Ma vi {input.WalletId}"; 

            pay.AddRequestData("vnp_Version", _appSettings.Value.Version);
            pay.AddRequestData("vnp_Command", _appSettings.Value.Command);
            pay.AddRequestData("vnp_TmnCode", _appSettings.Value.TmnCode);
            pay.AddRequestData("vnp_Amount", (input.TransactionAmount * 100).ToString());
            pay.AddRequestData("vnp_CreateDate", DateTime.Now.ToString("yyyyMMddHHmmss"));
            pay.AddRequestData("vnp_CurrCode", _appSettings.Value.CurrCode);
            pay.AddRequestData("vnp_IpAddr", pay.GetIpAddress(context));
            pay.AddRequestData("vnp_Locale", _appSettings.Value.Locale);
            pay.AddRequestData("vnp_OrderInfo", input.WalletId.ToString());
            pay.AddRequestData("vnp_OrderType", orderDesc);
            pay.AddRequestData("vnp_ReturnUrl", "http://localhost:3000/VnpayCallback/PaymentCallback");
            pay.AddRequestData("vnp_TxnRef", tick);
            pay.AddRequestData("vnp_BankCode", input.BankCode);

            var paymentUrl = pay.CreateRequestUrl(_appSettings.Value.BaseUrl, _appSettings.Value.HashSecret);

            return paymentUrl;
        }
    }
}
