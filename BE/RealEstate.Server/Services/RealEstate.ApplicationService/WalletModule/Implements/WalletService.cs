using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using RealEstate.ApplicationBase.Common;
using RealEstate.ApplicationService.Common;
using RealEstate.ApplicationService.WalletModule.Abstracts;
using RealEstate.ApplicationService.WalletModule.Dtos;
using RealEstate.Domain.Entities;
using RealEstate.Utils.ConstantVariables.Shared;
using RealEstate.Utils.CustomException;
using RealEstate.Utils.Linq;
using RealEstate.Utils.Securiry;

namespace RealEstate.ApplicationService.WalletModule.Implements
{
    public class WalletService : ServiceBase, IWalletService
    {
        public WalletService(ILogger<WalletService> logger, IHttpContextAccessor httpContext) : base(logger, httpContext)
        {
        }

        public void CreateNewWallet(int userId)
        {
            var user = _dbContext.Users.FirstOrDefault(x => x.Id == userId) ?? throw new UserFriendlyException(ErrorCode.UserNotFound);
            if(_dbContext.Wallets.Any(x => x.UserId == userId))
            {
                throw new UserFriendlyException(ErrorCode.UserHasBeenCreatedWallet);
            }
            var walletInfo = new Wallet
            {
                Balance = 0,
                WalletNumber = "BDS" + user.PhoneNumber,
                UserId = userId,
            };
            _dbContext.Wallets.Add(walletInfo);
            _dbContext.SaveChanges();
        }

        public PagingResult<TransactionDto> GetHistoryTransaction(WalletPagingRequestDto input)
        {
            var query = from wallet in _dbContext.Wallets
                        join transaction in _dbContext.Transactions on wallet.Id equals transaction.WalletID
                        where wallet.Id == input.WalletID
                        select new TransactionDto
                        {
                            WalletID = transaction.WalletID,
                            Id = transaction.Id,
                            Amount = transaction.Amount,
                            CreateDate = transaction.CreateDate,
                            Description = transaction.Description,
                            TransactionFrom = transaction.TransactionFrom,
                            TransactionTo = transaction.TransactionTo,
                            TransactionType = transaction.TransactionType
                        };
            var result = new PagingResult<TransactionDto>()
            {
                TotalItems = query.Count(),
            };
            query = query.OrderDynamic(input.Sort);
            if (input.PageSize != -1)
            {
                query = query.Skip(input.PageSize).Take(input.PageSize);
            }
            result.Items = query;
            return result;
        }

        public WalletDto GetWalletInfo()
        {
            var userId = _httpContext.GetCurrentUserId();
            _logger.LogInformation($"{nameof(GetWalletInfo)} userId = {userId}");
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
