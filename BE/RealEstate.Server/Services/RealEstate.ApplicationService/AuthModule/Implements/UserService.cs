using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using RealEstate.ApplicationBase.Common;
using RealEstate.ApplicationService.AuthModule.Abstracts;
using RealEstate.ApplicationService.AuthModule.Dtos;
using RealEstate.ApplicationService.Common;
using RealEstate.Domain.Entities;
using RealEstate.Utils.ConstantVariables.Shared;
using RealEstate.Utils.ConstantVariables.User;
using RealEstate.Utils.CustomException;
using RealEstate.Utils.Linq;
using RealEstate.Utils.Securiry;
using System.Text.Json;

namespace RealEstate.ApplicationService.AuthModule.Implements
{
    public class UserService : ServiceBase, IUserService
    {
        public UserService(ILogger<UserService> logger,
            IHttpContextAccessor httpContext)
            : base(logger, httpContext)
        {
        }

        public User ValidateUser(string username, string password)
        {
            var user = _dbContext.Users.FirstOrDefault(u => u.Username == username && !u.Deleted)
                ?? throw new UserFriendlyException(ErrorCode.UsernameOrPasswordIncorrect);
            if (user.Password != CryptographyUtils.CreateMD5(password))
            {
                throw new UserFriendlyException(ErrorCode.UsernameOrPasswordIncorrect);
            }
            if (user.Status != UserStatus.ACTIVE)
            {
                throw new UserFriendlyException(ErrorCode.UserIsDeactive);
            }
            return user;
        }

        public virtual void CreateUser(CreateUserDto input)
        {
            _logger.LogInformation($"{nameof(CreateUser)}: input = {JsonSerializer.Serialize(input)}");
            var userId = CommonUtils.GetCurrentUserId(_httpContext);
            input.Password = CryptographyUtils.CreateMD5(input.Password);
            var user = _mapper.Map<User>(input);
            var transaction = _dbContext.Database.BeginTransaction();
            if (input?.Status == null)
            {
                user.Status = UserStatus.ACTIVE;
            }

            var result = _dbContext.Users.Add(user);


            _dbContext.SaveChanges();

            ////Thêm role
            //if (input.RoleIds != null)
            //{
            //    foreach (var item in input.RoleIds)
            //    {
            //        var role = _dbContext.Roles.FirstOrDefault(e => e.Id == item) ?? throw new UserFriendlyException(ErrorCode.RoleNotFound);
            //        _dbContext.UserRoles.Add(new UserRole
            //        {
            //            UserId = result.Entity.Id,
            //            RoleId = item
            //        });
            //    }
            //    _dbContext.SaveChanges();
            //}

            transaction.Commit();

        }

        public User FindById(int id)
        {
            var user = _dbContext.Users.FirstOrDefault(u => u.Id == id && u.Status == UserStatus.ACTIVE && !u.Deleted);
            return user ?? throw new UserFriendlyException(ErrorCode.UserNotFound);
        }

        public PagingResult<UserDto> FindAll(FilterUserDto input)
        {
            _logger.LogInformation($"{nameof(FindAll)}: input = {JsonSerializer.Serialize(input)}");
            var result = new PagingResult<UserDto>();
            var users = _dbContext.Users.Where(u => !u.Deleted && (input.Username == null || u.Username.Contains(input.Username))
                                                               && (input.FullName == null || u.Fullname.Contains(input.FullName))
                                                               && (input.Status == null || u.Status == input.Status));
            // đếm tổng trước khi phân trang
            result.TotalItems = users.Count();
            users = users.OrderDynamic(input.Sort);

            if (input.PageSize != -1)
            {
                users = users.Skip(input.GetSkip()).Take(input.PageSize);
            }
            result.Items = _mapper.Map<List<UserDto>>(users);
            //foreach (var item in result.Items)
            //{
            //    var userRoles = _dbContext.UserRoles.Where(e => e.UserId == item.Id && !e.Deleted).Select(e => e.RoleId);
            //    item.RoleIds = userRoles.ToList();
            //}
            return result;
        }

        public void Update(UpdateUserDto input)
        {
            var userId = CommonUtils.GetCurrentUserId(_httpContext);
            _logger.LogInformation($"{nameof(Update)}: input = {JsonSerializer.Serialize(input)}, userId = {userId}");

            var user = _dbContext.Users.FirstOrDefault(u => u.Id == input.Id && u.Status == UserStatus.ACTIVE && !u.Deleted) ?? throw new UserFriendlyException(ErrorCode.UserNotFound); ;
            user.Email = input.Email;
            user.Phone = input.Phone;
            user.Fullname = input.FullName;

            //Thêm role
            //if (input.RoleIds != null)
            //{
            //    foreach (var item in input.RoleIds)
            //    {
            //        var role = _dbContext.Roles.FirstOrDefault(e => e.Id == item) ?? throw new UserFriendlyException(ErrorCode.RoleNotFound);
            //    }
            //}

            var insertUserRole = new List<int>();
            var removeUserRole = new List<int>();
            //var inputUserRole = input.RoleIds;
            //Danh sách role hiện tại được gán cho user
            //var currentUserRole = _dbContext.UserRoles.Where(e => e.UserId == input.Id).Select(e => e.RoleId).ToList();

            ////Xóa những role gán với user
            //removeUserRole = currentUserRole.Except(inputUserRole).ToList();
            //foreach (var item in removeUserRole)
            //{
            //    var userRole = _dbContext.UserRoles.FirstOrDefault(e => e.UserId == input.Id && e.RoleId == item);
            //    if (userRole != null)
            //    {
            //        userRole.Deleted = true;
            //    }
            //}

            ////Thêm những role trong input chưa  có trong db
            //insertUserRole = inputUserRole.Except(currentUserRole).ToList();
            //foreach (var item in insertUserRole)
            //{
            //    _dbContext.UserRoles.Add(new UserRole
            //    {
            //        UserId = input.Id,
            //        RoleId = item
            //    });
            //}

            _dbContext.SaveChanges();
        }

        public void Delete(int id)
        {
            var userId = CommonUtils.GetCurrentUserId(_httpContext);
            _logger.LogInformation($"{nameof(Delete)}: id = {id}, userId = {userId}");

            var user = _dbContext.Users.FirstOrDefault(u => u.Id == id && !u.Deleted) ?? throw new UserFriendlyException(ErrorCode.UserNotFound);
            user.Deleted = true;
            _dbContext.SaveChanges();
        }

        public void ChangeStatus(int id)
        {
            var userId = CommonUtils.GetCurrentUserId(_httpContext);
            _logger.LogInformation($"{nameof(ChangeStatus)}: id = {id}, userId = {userId}");
            var user = _dbContext.Users.FirstOrDefault(u => u.Id == id && !u.Deleted) ?? throw new UserFriendlyException(ErrorCode.UserNotFound);

            if (user.Status == UserStatus.ACTIVE)
            {
                user.Status = UserStatus.DEACTIVE;

            }
            else
            {
                user.Status = UserStatus.ACTIVE;
            }
            _dbContext.SaveChanges();
        }

        public void SetPassword(SetPasswordUserDto input)
        {
            var userId = CommonUtils.GetCurrentUserId(_httpContext);
            _logger.LogInformation($"{nameof(SetPassword)}: input = {JsonSerializer.Serialize(input)}, userId = {userId}");

            var user = _dbContext.Users.FirstOrDefault(e => e.Id == input.Id && !e.Deleted)
                ?? throw new UserFriendlyException(ErrorCode.UserNotFound);

            user.Password = CryptographyUtils.CreateMD5(input.Password);
            _dbContext.SaveChanges();
        }

        public void ChangePassword(ChangePasswordDto input)
        {
            var userId = CommonUtils.GetCurrentUserId(_httpContext);
            _logger.LogInformation($"{nameof(ChangePassword)}: input = {JsonSerializer.Serialize(input)}, userId = {userId}");
            var user = _dbContext.Users.FirstOrDefault(e => e.Id == userId && !e.Deleted)
                ?? throw new UserFriendlyException(ErrorCode.UserNotFound);

            if (CryptographyUtils.CreateMD5(user.Password) != CryptographyUtils.CreateMD5(input.OldPassword))
            {
                throw new UserFriendlyException(ErrorCode.UserOldPasswordIncorrect);
            }

            user.Password = CryptographyUtils.CreateMD5(input.NewPassword);
            _dbContext.SaveChanges();
        }
    }
}
