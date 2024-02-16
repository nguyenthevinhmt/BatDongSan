using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using RealEstate.ApplicationBase.Common;
using RealEstate.ApplicationService.Common;
using RealEstate.ApplicationService.WalletModule.Abstracts;

namespace RealEstate.ApplicationService.WalletModule.Implements
{
    public class VnpayService : ServiceBase, IVnpayService
    {
        public VnpayService(ILogger logger, IHttpContextAccessor httpContext) : base(logger, httpContext)
        {
        }

        public string CreatePaymentUrl(string WalletNumber, HttpContext context)
        {
            var tick = DateTime.Now.Ticks.ToString();
            var pay = new VnpayLibrary();
            var userId = _httpContext.GetCurrentUserId();

            //var orderTemp = (from ord in _dbContext.Orders
            //                 join orderDetail in _context.OrderDetails on ord.Id equals orderDetail.OrderId
            //                 join product in _context.Products on orderDetail.ProductId equals product.Id
            //                 join pp in _context.ProductPromotions on product.Id equals pp.ProductId
            //                 join pro in _context.Promotions on pp.PromotionId equals pro.Id
            //                 where ord.UserId == userId && ord.Id == model.OrderId
            //                 select new
            //                 {
            //                     Id = ord.Id,
            //                     OrderType = product.CategoryId,
            //                     TotalAmount = orderDetail.Quantity * (product.ActualPrice - product.ActualPrice * pro.DiscountPercent / 100),
            //                     CustomerName = _context.Users.Where(c => c.Id == userId).Select(c => c.FullName).FirstOrDefault(),
            //                     OrderDescription = "Thanh toán đơn hàng tại Foody App"
            //                 }).ToList();

            //var order = new
            //{
            //    Id = orderTemp.First().Id,
            //    OrderType = orderTemp.First().OrderType,
            //    TotalAmount = orderTemp.Sum(o => o.TotalAmount),
            //    CustomerName = orderTemp.First().CustomerName,
            //    OrderDescription = orderTemp.First().OrderDescription,
            //};

            //pay.AddRequestData("vnp_Version", _appSettings.Version);
            //pay.AddRequestData("vnp_Command", _appSettings.Command);
            //pay.AddRequestData("vnp_TmnCode", _appSettings.TmnCode);
            //pay.AddRequestData("vnp_Amount", (order.TotalAmount * 100).ToString());
            //pay.AddRequestData("vnp_CreateDate", DateTime.Now.ToString("yyyyMMddHHmmss"));
            //pay.AddRequestData("vnp_CurrCode", _appSettings.CurrCode);
            //pay.AddRequestData("vnp_IpAddr", pay.GetIpAddress(context));
            //pay.AddRequestData("vnp_Locale", _appSettings.Locale);
            //pay.AddRequestData("vnp_OrderInfo", order.Id.ToString());
            //pay.AddRequestData("vnp_OrderType", order.OrderType.ToString());
            //pay.AddRequestData("vnp_ReturnUrl", "http://localhost:5010/api/VnpayCallback/PaymentCallback");
            //pay.AddRequestData("vnp_TxnRef", tick);
            //pay.AddRequestData("vnp_BankCode", _appSettings.BankCode);

            var paymentUrl = "123132132";
                //pay.CreateRequestUrl(_appSettings.BaseUrl, _appSettings.HashSecret);

            return paymentUrl;
        }
    }
}
