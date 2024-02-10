export class authConst {
  public static AuthErrorMessage = {
    UsernameOrPasswordIncorrect: "Tài khoản hoặc mật khẩu không chính xác!",
    AccountHasNotBeenValidateOtp: "Tài khoản chưa xác minh OTP",
    UserIsDeactive: "Tài khoản người dùng đã bị khóa",
    VerifiedOtpFailed: "Mã OTP không hợp lệ",
  };
  public static RouteConst = {
    registerRouter: "/auth/register",
    loginRouter: "/auth/login",
    otpRouter: "/auth/validate-otp",
  };
  public static ResponseStatus = {
    ERROR: 0,
    SUCCESS: 1,
  };
}
