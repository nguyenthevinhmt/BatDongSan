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
        void CreateUser(CreateUserDto input);

        /// <summary>
        /// Cập nhật thông tin tài khoản
        /// </summary>
        /// <param name="input"></param>
        void Update(UpdateUserDto input);
        /// <summary>
        /// Cập nhật trạng thái tài khoản
        /// </summary>
        /// <param name="id"></param>
        void ChangeStatus(int id);
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
    }
}
