using DocumentFormat.OpenXml.Spreadsheet;
using EntitiesBase.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Org.BouncyCastle.Asn1.Crmf;
using RealEstate.ApplicationBase.Common;
using RealEstate.ApplicationService.AuthModule.Abstracts;
using RealEstate.ApplicationService.AuthModule.Dtos;
using RealEstate.ApplicationService.Common;
using RealEstate.ApplicationService.EmailModule.Abstracts;
using RealEstate.ApplicationService.EmailModule.Dtos;
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
        private readonly IEmailService _emailService;

        public UserService(ILogger<UserService> logger,
            IHttpContextAccessor httpContext, IEmailService emailService)
            : base(logger, httpContext)
        {
            _emailService = emailService;
        }

        public User ValidateUser(string username, string password)
        {
            var user = _dbContext.Users.FirstOrDefault(u => u.Username == username && !u.Deleted)
                ?? throw new UserFriendlyException(ErrorCode.UsernameOrPasswordIncorrect);
            if (user.Password != CryptographyUtils.CreateMD5(password))
            {
                throw new UserFriendlyException(ErrorCode.UsernameOrPasswordIncorrect);
            }
            else if (!user.isOtpConfirm)
            {
                throw new UserFriendlyException(ErrorCode.AccountIsNotVerifiedOtp);
            }
            else if (user.Status != UserStatus.ACTIVE)
            {
                throw new UserFriendlyException(ErrorCode.UserIsDeactive);
            }
            
            return user;
        }

        public virtual UserDto CreateUser(CreateUserDto input)
        {
            _logger.LogInformation($"{nameof(CreateUser)}: input = {JsonSerializer.Serialize(input)}");
            if(_dbContext.Users.Any(c => c.Username == input.Username))
            {
                throw new UserFriendlyException(ErrorCode.UsernameIsExist);
            }

            //var checkEmailExist = _dbContext.Users.FirstOrDefault(c => c.Email == input.Email)
            //                        ?? throw new UserFriendlyException(ErrorCode.EmailIsExist);
            input.Password = CryptographyUtils.CreateMD5(input.Password);
            var otp = GenerateCodes.GetRandomOTP();
            var user = new User()
            {
                UserType = UserTypes.CUSTOMER,
                Username = input.Username,
                Email = input.Email,
                Password = input.Password,
                Fullname = input.FullName,
                PhoneNumber = input.Phone,
                Otp = CryptographyUtils.CreateMD5(otp),
                OtpExpiredTime = DateTime.Now.AddMinutes(2),
                Status = UserStatus.ACTIVE,

            };
            if (input?.Status == null)
            {
                user.Status = UserStatus.ACTIVE;
            }

            var result = _dbContext.Users.Add(user);
            var response = result.Entity;
            _dbContext.SaveChanges();
            SendOtp(user.Email, user.Fullname, otp);
            return new UserDto
            {
                Id = response.Id,
                Email = response.Email,
                FullName = response.Fullname,
                Phone = response.PhoneNumber,
                Username = response.Username,
                UserType = response.UserType,
                Status = response.Status
            };
        }

        public User FindById(int id)
        {
            var user = _dbContext.Users.FirstOrDefault(u => u.Id == id && u.Status == UserStatus.ACTIVE && !u.Deleted)
                ?? throw new UserFriendlyException(ErrorCode.UserNotFound);
            return user;
        }
        public UserDetailDto FindUserDetail(int id)
        {
            var user = _dbContext.Users.FirstOrDefault(u => u.Id == id && u.Status == UserStatus.ACTIVE && !u.Deleted)
                ?? throw new UserFriendlyException(ErrorCode.UserNotFound);
            return _mapper.Map<UserDetailDto>(user);
        }

        public PagingResult<UserDto> FindAll(FilterUserDto input)
        {
            _logger.LogInformation($"{nameof(FindAll)}: input = {JsonSerializer.Serialize(input)}");
            var result = new PagingResult<UserDto>();
            var users = _dbContext.Users.Where(u => !u.Deleted && u.isOtpConfirm && (input.Username == null || u.Username.Contains(input.Username))
                                                               && (input.FullName == null || u.Fullname.Contains(input.FullName))
                                                               && (input.Status == null || u.Status == input.Status)
                                                               && (input.PhoneNumber == null || u.PhoneNumber == input.PhoneNumber));
            // đếm tổng trước khi phân trang
            result.TotalItems = users.Count();
            users = users.OrderDynamic(input.Sort);

            if (input.PageSize != -1)
            {
                users = users.Skip(input.GetSkip()).Take(input.PageSize);
            }
            result.Items = _mapper.Map<List<UserDto>>(users);
            return result;
        }

        public UserDetailDto Update(UpdateUserDto input)
        {
            var userId = CommonUtils.GetCurrentUserId(_httpContext);
            _logger.LogInformation($"{nameof(Update)}: input = {JsonSerializer.Serialize(input)}, userId = {userId}");

            var user = _dbContext.Users.FirstOrDefault(u => u.Id == input.Id && u.Status == UserStatus.ACTIVE && !u.Deleted) ?? throw new UserFriendlyException(ErrorCode.UserNotFound); ;
            user.Email = input.Email;
            user.PhoneNumber = input.Phone;
            user.Fullname = input.FullName;

            _dbContext.SaveChanges();
            return _mapper.Map<UserDetailDto>(user);
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

            if (user.Password != CryptographyUtils.CreateMD5(input.OldPassword))
            {
                throw new UserFriendlyException(ErrorCode.UserOldPasswordIncorrect);
            }

            user.Password = CryptographyUtils.CreateMD5(input.NewPassword);
            _dbContext.SaveChanges();
        }

        public void CheckUserOTP(string otp, int userId)
        {
            _logger.LogInformation($"{nameof(CheckUserOTP)}: userId = {userId}, otp = {otp}");
            var user = _dbContext.Users.FirstOrDefault(c => c.Id == userId) ?? throw new UserFriendlyException(ErrorCode.UserNotFound);
            if (user.Otp == CryptographyUtils.CreateMD5(otp) && user.OtpExpiredTime >= DateTime.Now)
            {
                user.isOtpConfirm = true;
                if (_dbContext.Wallets.Any(x => x.UserId == userId))
                {
                    throw new UserFriendlyException(ErrorCode.UserHasBeenCreatedWallet);
                }
                var walletInfo = new Wallet
                {
                    Balance = 0,
                    WalletNumber = "BDS" + user.Id + user.PhoneNumber,
                    UserId = userId,
                };
                _dbContext.Wallets.Add(walletInfo);
                _dbContext.SaveChanges();
                try
                {
                    MailContent content = new MailContent
                    {
                        To = user.Email,
                        Subject = $"[Thông báo đăng ký tài khoản thành công]",
                        Body = $@"
                                <div>
                                        <h2>Đăng ký tài khoản thành công</h2>
                                        <p>Chào mừng bạn đến với cộng đồng của chúng tôi. Tài khoản của bạn đã được tạo thành công.</p>
                                        <p>Bạn có thể bắt đầu trải nghiệm dịch vụ của chúng tôi bằng cách đăng nhập vào tài khoản của mình.</p>
                                        <p>Nếu bạn có bất kỳ câu hỏi hoặc cần hỗ trợ, đừng ngần ngại liên hệ với chúng tôi qua email hoặc số điện thoại.</p>
                                        <p>Cảm ơn bạn một lần nữa và chúc bạn một ngày tuyệt vời!</p>
  
                                        <p>Trân trọng,</p>
                                        <p>Batdongsan.com</p>
                                </div>
                            "
                    };
                    _emailService.SendMail(content);
                }
                catch (Exception ex)
                {
                    Console.WriteLine("Failed to send email: " + ex.Message);
                }
            }
            else
            {
                throw new UserFriendlyException(ErrorCode.VerifiedOtpFailed);
            }
        }

        public UserDetailDto FindCurrentUserInfo()
        {
            var currentUserId = _httpContext.GetCurrentUserId();
            _logger.LogInformation($"{nameof(FindCurrentUserInfo)}: currentUserId: {currentUserId}");

            var userInfo = _dbContext.Users.FirstOrDefault(u => u.Id == currentUserId)
                                    ?? throw new UserFriendlyException(ErrorCode.UserNotFound);

                return _mapper.Map<UserDetailDto>(userInfo);
        }

        public UserDto RefreshOTP(string username)
        {
            _logger.LogInformation($"{nameof(RefreshOTP)}: Username: {username}");
            var user = _dbContext.Users.FirstOrDefault( u => u.Username == username && !u.isOtpConfirm)
                        ?? throw new UserFriendlyException(ErrorCode.UserNotFound);

            var otp = GenerateCodes.GetRandomOTP();
            user.Otp = CryptographyUtils.CreateMD5(otp);
            user.OtpExpiredTime = DateTime.Now.AddMinutes(2);
            _dbContext.SaveChanges();
            SendOtp(user.Email, user.Fullname, otp);
            return new UserDto
            {
                Id = user.Id,
                Email = user.Email,
                FullName = user.Fullname,
                Phone = user.PhoneNumber,
                Username = user.Username,
                UserType = user.UserType,
                Status = user.Status
            };
        }
        /// <summary>
        /// sinh OTP
        /// </summary>
        /// <param name="email"></param>
        /// <param name="fullname"></param>
        /// <param name="otp"></param>
        private void SendOtp(string email, string fullname, string otp)
        {
            try
            {
                MailContent content = new MailContent
                {
                    To = email,
                    Subject = $"[Xác nhận đăng ký tài khoản]",
                    Body = $@"
                    <div>
                          <p>Chào {fullname},</p>

                          <p>Mã xác thực của bạn là {otp}</p>
                          <p>
                            Bạn vui lòng nhập mã xác thực để hoàn tất việc xác thực tài khoản trên
                            hệ thống nhé!
                          </p>
                          <p>
                            Lưu ý
                            <b
                              >Mã OTP có hiệu lực tối đa
                              <span style=""color: #3381d0"">2 phút</span></b
                            >
                          </p>
                          <br />
                          <p>*Đây là email tự động, vui lòng không trả lời vào hòm thư này*</p>
                    </div>
                "
                };
                _emailService.SendMail(content);
            }
            catch (Exception ex)
            {
                Console.WriteLine("Failed to send email: " + ex.Message);
            }
        }
    }
}
