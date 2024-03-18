using Microsoft.AspNetCore.Mvc;
using RealEstate.ApplicationService.BankAccountModule.Abstract;
using RealEstate.ApplicationService.BankAccountModule.Dtos;
using RealEstate.Utils;
using WebAPIBase.Controller;

namespace RealEstate.API.Controllers
{
    [Route("api/bank-account")]
    [ApiController]
    public class BankAccountController : ApiControllerBase
    {
        private readonly IBankAccountService _bankAccountService;

        public BankAccountController(IBankAccountService bankAccountService)
        {
            _bankAccountService = bankAccountService;
        }
        /// <summary>
        /// Thêm mới tài khoản ngân hàng
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        [HttpPost("create")]
        public ApiResponse Create([FromBody] CreateBankAccount input)
        {
            _bankAccountService.CreateBankAccount(input);
            return new();
        }
        /// <summary>
        /// Danh sách tài khoản ngân hàng
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        [HttpGet("find-all")]
        public ApiResponse FindAll([FromQuery] BankAccountPagingRequestDto input)
        {
            return new(_bankAccountService.FindAll(input));
        }
        /// <summary>
        /// Xóa tài khoản ngân hàng
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpDelete("remove")]
        public ApiResponse Remove(int id)
        {
            _bankAccountService.DeleteBankAccount(id);
            return new();
        }
    }
}
