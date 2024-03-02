using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RealEstate.ApplicationService.WalletModule.Abstracts;
using RealEstate.ApplicationService.WalletModule.Dtos.VnpayDto;

namespace RealEstate.API.Controllers
{
    [Authorize]
    [Route("api/vnpay")]
    [ApiController]
    public class VnpayController : ControllerBase
    {
        private readonly IVnpayService _service;

        public VnpayController(IVnpayService service)
        {
            _service = service;
        }
        [HttpPost("payment-vn-pay")]
        public IActionResult CreateUrl([FromBody]PaymentRequestDto input)
        {
            return Ok(_service.CreatePaymentUrl(input, HttpContext));
        }
    }
}
