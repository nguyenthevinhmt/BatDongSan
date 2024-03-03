using DocumentFormat.OpenXml.VariantTypes;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using RealEstate.ApplicationBase;
using RealEstate.ApplicationBase.Common;
using RealEstate.ApplicationService.BankAccountModule.Abstract;
using RealEstate.ApplicationService.BankAccountModule.Dtos;
using RealEstate.ApplicationService.Common;
using RealEstate.ApplicationService.PostModule.Implements;
using RealEstate.Domain.Entities;
using RealEstate.Utils.ConstantVariables.Shared;
using RealEstate.Utils.CustomException;
using RealEstate.Utils.Linq;

namespace RealEstate.ApplicationService.BankAccountModule.Implements
{
    public class BankAccountService : ServiceBase, IBankAccountService
    {
        public BankAccountService(ILogger<BankAccountService> logger, IHttpContextAccessor httpContext) : base(logger, httpContext)
        {
        }
        public void CreateBankAccount(CreateBankAccount input)
        {
            var currentUserId = _httpContext.GetCurrentUserId();
            var checkBank = _dbContext.BankAccounts.FirstOrDefault(c => c.BankName == input.BankName || c.BankCode == input.BankCode)
                            ?? throw new UserFriendlyException(ErrorCode.BankAccountTypeIsExist);
            var bankAccount = new BankAccount()
            {
                BankCode = input.BankCode,
                BankName = input.BankName,
                UserId = currentUserId,
                ReleaseDate = input.ReleaseDate,
                OwnerBankFullname = input.OwnerBankFullname
            };
            _dbContext.BankAccounts.Add(bankAccount);
            _dbContext.SaveChanges();
        }

        public PagingResult<BankAccountDto> FindAll(BankAccountPagingRequestDto input)
        {
            var currentUserId = _httpContext.GetCurrentUserId();
            var query = _dbContext.BankAccounts
                        .Where(c => !c.Deleted && c.UserId == currentUserId)
                        .Select(c => new BankAccountDto
                        {
                            Id = c.Id,
                            BankName = c.BankName,
                            BankCode = c.BankName,
                        });

            var result = new PagingResult<BankAccountDto>()
            {
                TotalItems = query.Count()
            };

            query = query.OrderDynamic(input.Sort);

            if (input.PageSize != -1)
            {
                query = query.Skip(input.PageSize).Take(input.PageSize);
            }
            result.Items = query;
            return result;
        }

        public void DeleteBankAccount(int id)
        {
            var currentUserId = _httpContext.GetCurrentUserId();
            var bankAccount = _dbContext.BankAccounts.FirstOrDefault(c => c.UserId == currentUserId && !c.Deleted && c.Id == id)
                            ?? throw new UserFriendlyException(ErrorCode.BankAccountNotFound);
            bankAccount.Deleted = true;
            _dbContext.SaveChanges();
        }

    }
}
