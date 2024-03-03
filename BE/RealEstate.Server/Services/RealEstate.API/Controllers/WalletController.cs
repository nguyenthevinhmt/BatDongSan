using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RealEstate.ApplicationBase.Common;
using RealEstate.ApplicationService.PostModule.Abstracts;
using RealEstate.ApplicationService.WalletModule.Abstracts;
using RealEstate.ApplicationService.WalletModule.Dtos;
using RealEstate.Utils;
using WebAPIBase.Controller;

namespace RealEstate.API.Controllers
{
    [Route("api/wallet")]
    [ApiController]
    public class WalletController : ApiControllerBase
    {
        private readonly IWalletService _walletService;

        public WalletController(IWalletService walletService)
        {
            _walletService = walletService;
        }
        /// <summary>
        /// Lấy lịch sử giao dịch
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        [HttpGet("get-all-transaction")]
        public ApiResponse<PagingResult<TransactionDto>> FindAllTransaction([FromQuery]WalletPagingRequestDto input)
        {
            return new(_walletService.GetHistoryTransaction(input));
        }
        /// <summary>
        /// Thông tin ví cá nhân
        /// </summary>
        /// <returns></returns>
        [HttpGet("personal/wallet-info")]
        public ApiResponse<WalletDto> FindCurrentWalletInfo()
        {
            return new(_walletService.GetWalletInfo());
        }

        /// <summary>
        /// Tạo mới ví cá nhân
        /// </summary>
        /// <param name="userId"></param>
        /// <returns></returns>
        [HttpPost("create")]
        public ApiResponse Create(int userId)
        {
            _walletService.CreateNewWallet(userId);
            return new();
        }

        /// <summary>
        /// Nạp tiền
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        [HttpPost("recharge")]
        public ApiResponse Recharge([FromBody]RechargeDto input)
        {
            _walletService.Recharge(input);
            return new();
        }

        /// <summary>
        /// Rút tiền về tài khoản ngân hàng
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        [HttpPost("withdraw")]
        public ApiResponse Withdraw([FromBody] WithdrawDto input)
        {
            _walletService.Withdraw(input);
            return new();
        }

        /// <summary>
        /// Thanh toán đăng bài
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        [HttpPost("payment")]
        public ApiResponse Payment([FromBody] PaymentDto input)
        {
            _walletService.Payment(input);
            return new();
        }
    }
}
