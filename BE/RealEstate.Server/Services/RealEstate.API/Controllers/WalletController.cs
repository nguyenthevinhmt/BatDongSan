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
    }
}
