using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RealEstate.ApplicationBase.Common;
using RealEstate.ApplicationService.AuthModule.Abstracts;
using RealEstate.ApplicationService.AuthModule.Dtos;
using RealEstate.Utils;

namespace RealEstate.API.Controllers
{
    [Route("api/user")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }
        /// <summary>
        /// Danh sách người dùng hệ thống
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        [Authorize]
        [HttpGet("find-all")]
        public ApiResponse<PagingResult<UserDto>> FindAll([FromQuery] FilterUserDto input)
        {
            return new(_userService.FindAll(input));
        }

        /// <summary>
        /// Thông tin chi tiết khách hàng
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet("find-by-id/{id}")]
        public ApiResponse<UserDetailDto> FindByID(int id)
        {
            return new(_userService.FindUserDetail(id));
        }
        /// <summary>
        /// Lấy thông tin cá nhân
        /// </summary>
        /// <returns></returns>
        [Authorize]
        [HttpGet("my-info")]
        public ApiResponse<UserDetailDto> FindMyInfo()
        {
            return new(_userService.FindCurrentUserInfo());
        }
        /// <summary>
        /// Đăng kí tài khoản 
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        [HttpPost("register")]
        public ApiResponse Register(CreateUserDto input)
        {
            return new(_userService.CreateUser(input));
        }
        /// <summary>
        /// Cập nhật thông tin tài khoản
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        [HttpPut("update")]
        public ApiResponse<UserDetailDto> Update(UpdateUserDto input)
        {
            return new(_userService.Update(input));
        }
        /// <summary>
        /// Cập nhật trạng thái tài khoản
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpPut("change-status")]
        public ApiResponse ChangeStatus(int id)
        {
            _userService.ChangeStatus(id);
            return new();
        }
        /// <summary>
        /// Xóa tài khoản
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpDelete("remove")]
        public ApiResponse Delete(int id)
        {
            _userService.Delete(id);
            return new();
        }
        /// <summary>
        /// Cập nhật mật khẩu
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        [HttpPut("change-password")]
        public ApiResponse ChangePassword(ChangePasswordDto input)
        {
            _userService.ChangePassword(input);
            return new();
        }
        /// <summary>
        /// Xác thực otp
        /// </summary>
        /// <param name="otp"></param>
        /// <param name="userId"></param>
        /// <returns></returns>
        [HttpPut("validate-otp")]
        public ApiResponse ValidateOTP(string otp, int userId)
        {
            _userService.CheckUserOTP(otp, userId);
            return new();
        }
        /// <summary>
        /// Tạo lại yêu cầu xác thực otp
        /// </summary>
        /// <param name="username"></param>
        /// <returns></returns>
        [HttpPut("refresh-otp")]
        public ApiResponse RefreshOTP(string username)
        {
            return new(_userService.RefreshOTP(username));
        }
    }
}
