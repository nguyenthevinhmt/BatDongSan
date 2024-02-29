export const API_STATUS_CODE = {
  
    //Tài khoản bị khoá
    LOCKED_ACCOUNT: 1002,
  
    /**
     * OTP
     */
    // 'Gửi lại OTP không thành công'
    OTP_SEND_FAIL: 15001,
  
    // 'Gửi lại OTP không thành công'
    OTP_RESEND_FAIL: 15002,
  
    //Mã OTP sai
    OTP_INVALID: 15003,
  
    //Mã OTP đã hết lượt xác thực
    OTP_EXPIRED: 15004,
  
    // 'Mã xác thực đã hết hạn. Vui lòng yêu cầu gửi lại'
    OTP_TIMEOUT: 15005,
  
    // 'Vượt quá số lần gửi mã xác thực cho phép'
    OTP_EXCEED_LIMIT: 15006,
  }
  