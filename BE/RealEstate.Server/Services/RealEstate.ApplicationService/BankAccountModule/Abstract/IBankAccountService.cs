using RealEstate.ApplicationBase.Common;
using RealEstate.ApplicationService.BankAccountModule.Dtos;

namespace RealEstate.ApplicationService.BankAccountModule.Abstract
{
    public interface IBankAccountService
    {
        /// <summary>
        /// Thêm mới tài khoản
        /// </summary>
        /// <param name="input"></param>
        void CreateBankAccount(CreateBankAccount input);
        /// <summary>
        /// Danh sách tài khoản ngân hàng
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        PagingResult<BankAccountDto> FindAll(BankAccountPagingRequestDto input);
        /// <summary>
        /// Xóa tài khoản ngân hàng
        /// </summary>
        /// <param name="id"></param>
        void DeleteBankAccount(int id);
    }
}
