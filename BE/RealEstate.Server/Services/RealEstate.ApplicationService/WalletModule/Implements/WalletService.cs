using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using RealEstate.ApplicationBase.Common;
using RealEstate.ApplicationService.Common;
using RealEstate.ApplicationService.WalletModule.Abstracts;
using RealEstate.ApplicationService.WalletModule.Dtos;
using RealEstate.Utils.ConstantVariables.Shared;
using RealEstate.Utils.CustomException;

namespace RealEstate.ApplicationService.WalletModule.Implements
{
    public class WalletService : ServiceBase, IWalletService
    {
        public WalletService(ILogger<WalletService> logger, IHttpContextAccessor httpContext) : base(logger, httpContext)
        {
        }

        public TransactionDto GetHistoryTransaction(int walletID)
        {
            var history = _dbContext.Transactions.FirstOrDefault() ?? throw new UserFriendlyException(ErrorCode.TransactionNotFound);
            return new TransactionDto()
            {
                Amount = history.Amount,
                Id = history.Id,
                CreateDate = history.CreateDate,
                Description = history.Description,
                TransactionFrom = history.TransactionFrom,
                TransactionTo = history.TransactionTo,
                TransactionType = history.TransactionType,
                WalletID = walletID
            };
        }

        public WalletDto GetWalletInfo()
        {
            var userId = _httpContext.GetCurrentUserId();
            //_logger.LogInformation($"{nameof(GetWalletInfo)} userId = {userId}");
            var wallet = _dbContext.Wallets.FirstOrDefault(x => x.UserId == userId) 
                            ?? throw new UserFriendlyException(ErrorCode.WalletNotFound);
            var result = new WalletDto()
            {
                Balance = wallet.Balance,
                Id = wallet.Id,
                UserId = userId,
                UserName = _dbContext.Users.Where(c => c.Id == userId).Select(x => x.Username).ToString() ?? "",
                WalletNumber = wallet.WalletNumber,
            };
            return result;
        }
    }
}
