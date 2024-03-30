namespace RealEstate.Utils.ConstantVariables.Post
{
    public static class PostStatuses
    {
        /// <summary>
        /// Khởi tạo/chờ thanh toán
        /// </summary>
        public const int INIT = 1;
        /// <summary>
        /// Chờ xử lý/ yêu cầu duyệt
        /// </summary>
        public const int PENDING = 2;
        /// <summary>
        /// Tin chưa đăng - chờ hiển thị
        /// </summary>
        public const int UNPOSTED = 3;
        /// <summary>
        /// Đã đăng - đang hiển thị
        /// </summary>
        public const int POSTED = 4;
        /// <summary>
        /// Hủy duyệt - không được duyệt
        /// </summary>
        public const int CANCEL = 5;
        /// <summary>
        /// Đã hết hạn
        /// </summary>
        public const int EXPIRED = 6;
    }
}
