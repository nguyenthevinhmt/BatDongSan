namespace RealEstate.Utils.ConstantVariables.Post
{
    public static class PostStatuses
    {
        /// <summary>
        /// Khởi tạo
        /// </summary>
        public const int INIT = 1;
        /// <summary>
        /// Chờ xử lý/ yêu cầu duyệt
        /// </summary>
        public const int PENDING = 2;
        /// <summary>
        /// Đã đăng
        /// </summary>
        public const int POSTED = 3;
        /// <summary>
        /// Hủy duyệt
        /// </summary>
        public const int CANCEL = 4;
        /// <summary>
        /// Đã gỡ
        /// </summary>
        public const int REMOVED = 5;
    }
}
