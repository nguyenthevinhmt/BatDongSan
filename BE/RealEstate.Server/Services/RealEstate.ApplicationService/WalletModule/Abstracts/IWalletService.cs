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
        /// <param name="walletID"></param>
        /// <returns></returns>
        TransactionDto GetHistoryTransaction(int walletID);
    }
}
