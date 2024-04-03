export class postStatus {
    //khởi tạo, chờ thanh toán
    public static INIT = 1;
    //chờ xử lý/ yêu cầu duyệt
    public static PENDING = 2;
    //đã phê duyệt, chờ đăng
    public static UNPOSTED = 3;
    //đã đăng - đang hiển thị
    public static POSTED = 4;
    //hủy duyệt, không được duyệt
    public static CANCEL = 5;
    //đã hết hạn
    public static EXPIRED = 6;
}