using RealEstate.Utils.ConstantVariables.Shared;

namespace RealEstate.Utils.CustomException
{
    /// <summary>
    /// Ngoại lệ cấp người dùng
    /// </summary>
    public class UserFriendlyException : Exception
    {
        /// <summary>
        /// Mã lỗi
        /// </summary>
        public readonly ErrorCode ErrorCode;
        /// <summary>
        /// Chuỗi cần localize sẽ tra trong từ điển, nếu có truyền chuỗi này thì 
        /// sẽ không lấy message của error nữa mà lấy theo chuỗi này
        /// </summary>
        public readonly string MessageLocalize;

        public UserFriendlyException(ErrorCode errorCode) : base()
        {
            ErrorCode = errorCode;
        }

        public UserFriendlyException(ErrorCode errorCode, string messageLocalize) : base()
        {
            ErrorCode = errorCode;
            MessageLocalize = messageLocalize;
        }
    }
}
