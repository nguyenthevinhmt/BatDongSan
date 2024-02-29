using RealEstate.ApplicationBase.Common;
using RealEstate.ApplicationService.WalletModule.Dtos;

namespace RealEstate.ApplicationService.WalletModule.Abstracts
{
    public interface IWalletService
    {
        /// <summary>
        /// Lấy thông tin ví cá nhân
        /// </summary>
        /// <returns></returns>
        WalletDto GetWalletInfo();
        /// <summary>
        /// Lịch sử giao dịch
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        PagingResult<TransactionDto> GetHistoryTransaction(WalletPagingRequestDto input);
        /// <summary>
        /// Tạo mới ví cá nhân
        /// </summary>
        /// <param name="userId"></param>
        void CreateNewWallet(int userId);
    }
}
