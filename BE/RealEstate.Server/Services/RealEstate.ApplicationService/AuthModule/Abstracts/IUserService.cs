using DocumentFormat.OpenXml.Bibliography;
using RealEstate.ApplicationBase.Common;
using RealEstate.ApplicationService.AuthModule.Dtos;
using RealEstate.Domain.Entities;

namespace RealEstate.ApplicationService.AuthModule.Abstracts
{
    public interface IUserService
    {
        /// <summary>
        /// Tìm kiếm User theo Id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        User FindById(int id);
        /// <summary>
        /// Thông tin chi tiết user
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        UserDetailDto FindUserDetail(int id);

        /// <summary>
        /// Validate user
        /// </summary>
        /// <param name="username"></param>
        /// <param name="password"></param>
        /// <returns></returns>
        User ValidateUser(string username, string password);

        /// <summary>
        /// Xem danh sách User
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        PagingResult<UserDto> FindAll(FilterUserDto input);

        /// <summary>
        /// Thêm user
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        UserDto CreateUser(CreateUserDto input);

        /// <summary>
        /// Cập nhật thông tin tài khoản
        /// </summary>
        /// <param name="input"></param>
        UserDetailDto Update(UpdateUserDto input);
        /// <summary>
        /// Cập nhật trạng thái tài khoản
        /// </summary>
        /// <param name="id"></param>
        void ChangeStatus(int id);
        /// <summary>
        /// Xóa người dùng
        /// </summary>
        /// <param name="id"></param>
        void Delete(int id);
        /// <summary>
        /// Set password cho user
        /// </summary>
        /// <param name="input"></param>
        void SetPassword(SetPasswordUserDto input);

        /// <summary>
        /// Thay đổi mật khẩu
        /// </summary>
        /// <param name="input"></param>
        void ChangePassword(ChangePasswordDto input);
        /// <summary>
        /// Check otp 
        /// </summary>
        /// <param name="otp"></param>
        /// <returns></returns>
        void CheckUserOTP(string otp, int userId);

        /// <summary>
        /// Thông tin người dùng hiện tại
        /// </summary>
        /// <returns></returns>
        UserDetailDto FindCurrentUserInfo();
        /// <summary>
        /// Tạo lại OTP
        /// </summary>
        /// <param name="username"></param>
        UserDto RefreshOTP(string username);
        /// <summary>
        /// Khóa tài khoản
        /// </summary>
        /// <param name="Password"></param>
        void DeactiveAccount(string Password);

        /// <summary>
        /// Thêm mới thông tin căn cước
        /// </summary>
        /// <param name="input"></param>
        void AddUserIdentification(CreateUserIdentificationDto input);
        /// <summary>
        /// Danh sách thẻ căn cước
        /// </summary>
        /// <returns></returns>
        List<UserIdentificationDto> FindAllUserIdentification();
        /// <summary>
        /// Chi tiết thông tin giấy tờ
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        DetailUserIdentificationDto FindUserIdenticationById(int id);
    }
}
