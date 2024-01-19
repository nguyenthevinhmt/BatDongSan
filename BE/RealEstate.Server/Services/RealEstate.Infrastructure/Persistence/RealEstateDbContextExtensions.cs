using Microsoft.EntityFrameworkCore;
using RealEstate.Domain.Entities;
using RealEstate.Utils.ConstantVariables.User;
using RealEstate.Utils.Securiry;

namespace RealEstate.Infrastructure.Persistence
{
    public static class RealEstateDbContextExtensions
    {
        public static void SeedData(this ModelBuilder modelBuilder)
        {
            #region User
            modelBuilder.Entity<User>().HasData(
                new User
                {
                    Id = 1,
                    Email = "admin",
                    Password = CryptographyUtils.CreateMD5("123qwe"),
                    Fullname = "admin",
                    UserType = UserTypes.ADMIN,
                    Status = UserStatus.ACTIVE,
                    PhoneNumber = "0972808703",
                    Username = "admin",
                },
                new User
                {
                    Id = 2,
                    Email = "customer",
                    Password = CryptographyUtils.CreateMD5("123qwe"),
                    Fullname = "customer",
                    UserType = UserTypes.CUSTOMER,
                    Status = UserStatus.ACTIVE,
                    PhoneNumber = "0972808703",
                    Username = "customer",
                });
            #endregion
            
            #region PostType
            modelBuilder.Entity<PostType>().HasData(
                new PostType
                {
                    Id = 1,
                    Name = "Đăng bán",
                    Deleted = false,
                },
                new PostType
                {
                    Id = 2,
                    Name = "Cho thuê",
                    Deleted = false,
                });
            #endregion

            #region RealEstateType
            modelBuilder.Entity<RealEstateType>().HasData(
                new RealEstateType
                {
                    Id = 1,
                    Name = "Căn hộ chung cư",
                    Deleted = false,
                },
                new RealEstateType
                {
                    Id = 2,
                    Name = "Nhà riêng",
                    Deleted = false,
                },
                new RealEstateType
                {
                    Id = 3,
                    Name = "Nhà biệt thự liền kề",
                    Deleted = false,
                },
                new RealEstateType
                {
                    Id = 4,
                    Name = "Nhà mặt phố",
                    Deleted = false,
                },
                new RealEstateType
                {
                    Id = 5,
                    Name = "Shophouse, nhà phố thương mại",
                    Deleted = false,
                },
                new RealEstateType
                {
                    Id = 6,
                    Name = "Đất nền dự án",
                    Deleted = false,
                },
                new RealEstateType
                {
                    Id = 7,
                    Name = "Bán đất",
                    Deleted = false,
                },
                new RealEstateType
                {
                    Id = 8,
                    Name = "Trang trại, khu nghỉ dưỡng",
                    Deleted = false,
                },
                new RealEstateType
                {
                    Id = 9,
                    Name = "Kho, nhà xưởng",
                    Deleted = false,
                },
                new RealEstateType
                {
                    Id = 10,
                    Name = "Bất động sản khác",
                    Deleted = false,
                },
                new RealEstateType
                {
                    Id = 11,
                    Name = "Nhà trọ, phòng trọ",
                    Deleted = false,
                },
                new RealEstateType
                {
                    Id = 12,
                    Name = "Văn phòng",
                    Deleted = false,
                },
                new RealEstateType
                {
                    Id = 13,
                    Name = "Cửa hàng, kiot",
                    Deleted = false,
                });
            #endregion
            
            #region Post
            modelBuilder.Entity<Post>().HasData(
                new Post
                {
                    Id = 1,
                    Title = "Quỹ căn view đẹp chính chủ bán cắt lỗ từ 300tr sổ đỏ chính chủ, miễn Phí MG, hỗ trợ vay tới 70%",
                    Description = "Bên em đang có quỹ căn chuyển nhượng giá siêu tốt chủ nhà không có nhu cầu sử dụng nên bán gấp, nhà mới chưa qua sử dụng không có nhu cầu ở nên muốn nhượng lại, ưu tiên cho anh chị khách hàng có nhu cầu ở thực hoặc mua để đầu tư cho thuê..." 
                                    + Environment.NewLine + "Bảng giá cập nhật liên tục:"
                                    + Environment.NewLine + "Căn 31 m² (Studio) giá bán 980 triệu (giá gốc 1 tỷ)."
                                    + Environment.NewLine + "Căn 47 m² (1PN + 1) giá bán 1.420 tỷ (giá gốc 1.45 tỷ)."
                                    + Environment.NewLine + "Căn 59 m² (2PN + 1VS) giá bán 1,65 tỷ (giá gốc 1.75 tỷ)."
                                    + Environment.NewLine + "Căn 67 m² (2PN + 2VS) căn giữa giá bán 2.1 tỷ (giá gốc 2.1 tỷ)."
                                    + Environment.NewLine + "Căn 69; 70 m² (2 PN + 2VS) căn góc, giá bán 2.250 tỷ (giá gốc 2.35 tỷ)."
                                    + Environment.NewLine + "Căn 80 m² (3 PN + 2VS) giá bán 2.60 tỷ (giá gốc 2.75tỷ)."
                                    + Environment.NewLine + "Căn 100m² (3PN + 2VS) giá bán 3.9 tỷ (giá gốc 4.05 tỷ)."
                                    + Environment.NewLine + "Cam kết:"
                                    + Environment.NewLine + "Tư vấn chọn căn, xem nhà thực tế, làm việc chính chủ."
                                    + Environment.NewLine + "Miễn 100% phí môi giới cho khách mua."
                                    + Environment.NewLine + "Giá cam kết rẻ nhất thị trường."
                                    + Environment.NewLine + "Xem nhà trực tiếp 24/7, làm việc với chủ nhà."
                                    + Environment.NewLine + "Hỗ trợ thủ tục nhanh gọn, pháp lý rõ ràng. Sang tên sổ đỏ chính chủ."
                                    + Environment.NewLine + "Quý khách có nhu cầu xem nhà và mua căn hộ xin vui lòng liên hệ: Ms Hoa SĐT 0986 784 968"
                                    + Environment.NewLine + "Ngoài ra còn nhiều căn hộ chưa đàm phán giá nét. Quý khách hàng quan tâm liên hệ trực tiếp hotline Ms Hoa 0986 784 968 (Zalo, Imess,... )."
                                    + Environment.NewLine + "Quý khách hãy nhấc máy và gọi cho em, em sẽ gửi quỹ căn đẹp giá rẻ nhất Vinhomes Oceanpark với phương châm lấy uy tín làm đầu, làm việc bằng cái tâm của mình."
                                    + Environment.NewLine + "Cảm ơn quý khách đã đọc tin.",
                    Province = "Hà Nội",
                    Distinct = "Gia Lâm",
                    Ward = "Dương Xá",
                    Street = "Vinhomes Ocean Park Gia Lâm",
                    Area = 59,
                    Price = 1650,
                    YoutubeLink = "https://youtu.be/dQw4w9WgXcQ?si=f0YnDTgYTUe6NBaY",
                    IsActive = true,
                    UserId = 1,
                    PostTypeId = 1,
                    RealEstateTypeId = 1,
                    Deleted = false,
                }
                ,
                new Post
                {
                    Id = 2,
                    Title = "Độc quyền CC Khai Sơn City trực tiếp CĐT CK 16,5% lên đến 1,2 tỷ/căn, 10%(300tr) ký HĐMB, LS0% 15th",
                    Description = "Trực tiếp CĐT mở bán quỹ căn view hồ đẹp nhất tháng 1/2024. Booking ra hàng tòa K5, K6, K6A siêu đẹp, 20 suất chiết khấu khủng lên tới 17,5%, đặt cọc thiện chí 10tr giữ ngay căn đông nam đẹp nhất bảng hàng. Giá chỉ 3,4 tỷ."
                                    + Environment.NewLine + "Thông tin dự án Khai Sơn City:"
                                    + Environment.NewLine + "Khai Sơn City được định hình trở thành thành phố ven sông đáng sống, đón chào sự dịch chuyển cư dân từ trung tâm phố cổ Hà Nội."
                                    + Environment.NewLine + "Vị trí: Nằm sát đường Lý Sơn gồm 3 toà cao 21 tầng thuộc khu đô thị rộng 180 ha. Căn hộ hiện đại tiện nghi đáp ứng cuộc sống Xanh An Lành của 1 Thành Phố bên sông Gần các khu đô thị mới như: KĐT Việt Hưng, KĐT Sài Đồng, KĐT Eurowindow RiverPark, KĐT Vinhomes Riverside, Chung cư Bình Minh Garden, Imperia River View, Le Grand Jardin, Beriver Jardin, Khu đô thị Vinhome Riverside..."
                                    + Environment.NewLine + "Nằm trên QL5 kết nối thuận tiện, dễ dàng, 2Km ra Phố Cổ, Hồ Tây, Hồ Gươm, Lăng Chủ Tịch, BigC Long Biên, 1km ra BigC Long Biên, Lotte Cinema, Media Mart, 3Km ra TTTM Aeon Mall, kế bên Công Viên, Hồ Điều Hòa 22Ha, trường học Liên cấp..."
                                    + Environment.NewLine + "Tiện ích: Đầy đủ tất cả trong một khu đô thị sống xanh gồm: Shophouse thấp tầng, công viên trung tâm, hồ điều hòa, trường học liên cấp, bệnh viện quốc tế, khách sạn 5 sao, khối đế cao tầng thương mại, Gym, spa, nhà trẻ, bể bơi..."
                                    + Environment.NewLine + "Pháp lý đầy đủ, chỉ 10% ký HĐMB"
                                    + Environment.NewLine + "Liên hệ Quang Nghĩa TPKD CĐT 0983 333 423Đã sao chép để nhận ngay bảng giá, quỹ căn và CSBH mới nhất."
                                    + Environment.NewLine + "Cảm ơn quý khách đã đọc tin.",
                    Province = "Hà Nội",
                    Distinct = "Long Biên",
                    Ward = "Thượng Thanh",
                    Street = "Khai Sơn City",
                    Area = 89.53,
                    Price = 3400,
                    YoutubeLink = "https://youtu.be/dQw4w9WgXcQ?si=f0YnDTgYTUe6NBaY",
                    IsActive = true,
                    UserId = 1,
                    PostTypeId = 1,
                    RealEstateTypeId = 1,
                    Deleted = false,
                },
                new Post
                {
                    Id = 3,
                    Title = "2PN + 1 khu cao cấp Masteri Homes chỉ 3,8 tỷ. Nhận nhà ngay, miễn phí dịch vụ 3 năm, 2 hầm để xe",
                    Description = "Duy nhất căn 2PN + 1 tòa khách sạn cao cấp Masteri Homes thuộc dự án Vinhomes Smart City."
                                    + Environment.NewLine + "Hướng ban công Đông Nam thoáng mát ngày hè, ấm áp ngày đông."
                                    + Environment.NewLine + "Với lợi thế sẵn sàng nhận nhà ở ngay, tiêu chuẩn siêu cao cấp được trang bị trong căn hộ giúp khách hàng nhận nhà giảm thiểu chi phí hoàn thiện nội thất khi về ở."
                                    + Environment.NewLine + "Miễn phí phí dịch vụ lên đến 3 năm."
                                    + Environment.NewLine + "2 hầm để xe đảm bảo hơn hẳn các khu khác khi chỉ với 1 hầm để xe."
                                    + Environment.NewLine + "Dễ dàng thiết kế thêm 1 phòng ngủ nhỏ với góc + 1 lớn, cùng ánh sáng tự nhiên thoáng rộng bởi khung cửa tràn từ sàn đến trần thạch cao."
                                    + Environment.NewLine + "Vị trí siêu đắc địa với 3 bước ra hồ trung tâm, cầu vượt di chuyển Thiên Đường Bảo Sơn kế cạnh, cùng 2 nhà để xe nổi lớn nhất dự án."
                                    + Environment.NewLine + "Liên hệ đặt căn tại 0913 333 936 - Em Hòa."
                                    + Environment.NewLine + "Cảm ơn quý khách đã đọc tin.",
                    Province = "Hà Nội",
                    Distinct = "Nam Từ Liêm",
                    Ward = "Tây Mỗ",
                    Street = "Masteri West Heights",
                    Area = 64,
                    Price = 3840,
                    YoutubeLink = "https://youtu.be/dQw4w9WgXcQ?si=f0YnDTgYTUe6NBaY",
                    IsActive = true,
                    UserId = 1,
                    PostTypeId = 1,
                    RealEstateTypeId = 1,
                    Deleted = false,
                },
                new Post
                {
                    Id = 4,
                    Title = "BÁN NHÀ CHÍNH CHỦ TRẦN QUỐC HOÀN, CẦU GIẤY",
                    Description = "Bán 1 trong 2 nhà 5 tầng ngõ phố Trần Quốc Hoàn, Cầu Giấy, HN."
                                    + Environment.NewLine + "1, Diện tích 76,5m², mặt tiền 6,13m."
                                    + Environment.NewLine + "Giá 16,xxx tỷ."
                                    + Environment.NewLine + "Sổ đỏ đầy đủ."
                                    + Environment.NewLine + "2, Diện tích 50m²."
                                    + Environment.NewLine + "Mặt tiền 4m sổ đỏ."
                                    + Environment.NewLine + "Giá 12,xxx tỷ."
                                    + Environment.NewLine + "LH: 0972 802 786 chính chủ)."
                                    + Environment.NewLine + "Cảm ơn quý khách đã đọc tin.",
                    Province = "Hà Nội",
                    Distinct = "Cầu Giấy",
                    Ward = "Dịch Vọng Hậu",
                    Street = "Trần Quốc Hoàn",
                    Area = 50,
                    Price = 12000,
                    YoutubeLink = "https://youtu.be/dQw4w9WgXcQ?si=f0YnDTgYTUe6NBaY",
                    IsActive = true,
                    UserId = 1,
                    PostTypeId = 1,
                    RealEstateTypeId = 2,
                    Deleted = false,
                },
                new Post
                {
                    Id = 5,
                    Title = "Cần bán gấp, phố Thanh Nhàn, nhà 4 tầng, lô góc, nở hậu, ô tô đậu cửa, giá cắt lỗ 2.98 tỷ",
                    Description = "Nhà 4 tầng, hướng Tây Bắc, diện tích 23m², 2 mặt tiền 11/2m, giá 2.98 tỷ (có thương lượng)."
                                    + Environment.NewLine + "Địa chỉ: Số 64, Trại Găm, Đường Thanh Nhàn, Phường Thanh Nhàn, Hai Bà Trưng, Hà Nội"
                                    + Environment.NewLine + "Vị trí địa lý: Bán kính 5km có: Hồ Hoàn Kiếm, BV Bạch Mai, ĐH Kinh Tế Quốc Dân @ ĐH Bách Khoa, bbến xe Giáp Bát, công Viên Thống Nhất, đường vành đai 2, đường vành đai 3, cầu Vĩnh Tuy, Times City,... Trong khoảng bán kính 5km có đầy đủ tiện ích, trường học, bệnh viện, siêu thị, bến xe, giao thông gần đường vành đai 2, 3, vô cùng tiện lợi."
                                    + Environment.NewLine + "Quan điểm đầu tư: Phân khúc nhà mặt đất, với tầm giá 4 đến 9 tỷ, giá chỉ tương đương với căn hộ chung cư cao cấp 8 tỷ, với lợi thế là: Đất giữa thủ đô, sổ đỏ chính chủ, giá luôn tăng theo thời gian, ở không phát sinh thêm các khoản phí như ở chung cư. Chúng tôi khuyến nghị nên mua đầu tư."
                                    + Environment.NewLine + "Chúng tôi chuyên \"nhà khan hiếm\" nội thành Hà Nội (Nó không sinh ra, chỉ hết đi, giá luôn tăng, rất hiệu quả cho việc đầu tư tích trữ tài sản khi kinh tế suy thoái, và tăng nhanh ngay khi kinh tế phục hồi. \"Nhà Khan Hiếm\" luôn là mục tiêu săn lùng của các nhà đầu tư nhiều năm kinh nghiệm)."
                                    + Environment.NewLine + "Chi tiết IB Zalo 0987 088 629 Dương Quang Đế."
                                    + Environment.NewLine + "Cảm ơn quý khách đã đọc tin.",
                    Province = "Hà Nội",
                    Distinct = "Hai Bà Trưng",
                    Ward = "Thanh Nhàn",
                    Street = "Thanh Nhàn",
                    DetailAddress = "Số 64, Trại Găm",
                    Area = 23,
                    Price = 2980,
                    YoutubeLink = "https://youtu.be/dQw4w9WgXcQ?si=f0YnDTgYTUe6NBaY",
                    IsActive = true,
                    UserId = 1,
                    PostTypeId = 1,
                    RealEstateTypeId = 2,
                    Deleted = false,
                },
                new Post
                {
                    Id = 6,
                    Title = "Hiếm nhà Hai Bà Trưng 40m2 6T nhà mới thang máy, ngõ thông, kinh doanh nhỉnh 6 tỷ",
                    Description = "Trung tâm Hai Bà Trưng - nhà mới thang máy - ngõ thông, kinh doanh, hiếm."
                    + Environment.NewLine + "Minh Khai - DT: 40m² - MT: 5m - 6 tầng - nhỉnh 6 tỷ."
                    + Environment.NewLine + "Vị trí nhà nằm trên mặt ngõ thông, dân trí cao. Trung tâm của tiện ích. Có thể đi từ nhiều hướng vào nhà như: Minh Khai, Trần Khát Chân, Nguyễn Khoái. 5 phút lên bờ hồ, phố cổ."
                    + Environment.NewLine + "Chính chủ tự xây dựng, thiết kế hiện đại và hữu dụng."
                    + Environment.NewLine + "Nhà được thiết kế 6 tầng, nhiều phòng ngủ đủ công năng sử dụng."
                    + Environment.NewLine + "Sổ đỏ chính chủ, giao dịch sẵn sàng 24/7."
                    + Environment.NewLine + "Alo ngay em Lập chuyên nhà đẹp Hà Nội."
                    + Environment.NewLine + "Cảm ơn quý khách đã đọc tin.",
                    Province = "Hà Nội",
                    Distinct = "Hai Bà Trưng",
                    Ward = "Thanh Lương",
                    Street = "Minh Khai",
                    Area = 40,
                    Price = 6250,
                    YoutubeLink = "https://youtu.be/dQw4w9WgXcQ?si=f0YnDTgYTUe6NBaY",
                    IsActive = true,
                    UserId = 1,
                    PostTypeId = 1,
                    RealEstateTypeId = 2,
                    Deleted = false,
                },
                new Post
                {
                    Id = 7,
                    Title = "**DUY NHẤT** CĂN BIỆT THỰ ĐƠN LẬP - CĂN GÓC + MẶT SÔNG, C/VIÊN - GIÁ SOCK 28,5 TỶ + TẶNG VF9 2 TỶ.",
                    Description = "Cả thị trường có duy nhất 01 căn \"biệt thự đơn lập VVIP \" - chắc chắn X2 trong 2 năm."
                    + Environment.NewLine + "Lô góc + Mặt Sông + Mặt Công Viên - Siêu đẹp + Siêu Vip."
                    + Environment.NewLine + "Cả dãy đều là biệt thự (dự án có duy nhất 2 dãy đều là biệt thự)."
                    + Environment.NewLine + "Trục đường thông, 2 đầu 2 công viên."
                    + Environment.NewLine + "Diện tích: 210m², xây 4 tầng 350,3 m."
                    + Environment.NewLine + "Giá thanh toán theo tiến độ 4 tháng: 28,5 tỷ + Tặng xe VF9 gồm Pin 2 Tỷ."
                    + Environment.NewLine + "Nhiều khách sắp chốt - liên hệ xem ngay mới kịp - Hotline: 0918 606 666 (24/7)."
                    + Environment.NewLine + "Cảm ơn quý khách đã đọc tin.",
                    Province = "Hưng Yên",
                    Distinct = "Văn Giang",
                    Ward = "Văn Giang",
                    Street = "Vinhomes Ocean Park 2",
                    Area = 210,
                    Price = 28500,
                    YoutubeLink = "https://youtu.be/dQw4w9WgXcQ?si=f0YnDTgYTUe6NBaY",
                    IsActive = true,
                    UserId = 1,
                    PostTypeId = 1,
                    RealEstateTypeId = 3,
                    Deleted = false,
                },
                new Post
                {
                    Id = 8,
                    Title = "QUỸ CĂN KÍ MỚI BIỆT THỰ AN QUÝ VILLAS KĐT NAM CƯỜNG HÀ ĐÔNG MẶT ĐƯỜNG LÊ QUANG ĐẠO ĐÓN TĂNG GIÁ 50%",
                    Description = "ĐÓN SÓNG HẠ TẦNG 2024 X2 TÀI SẢN TƯƠNG LAI QUỸ ĐỘC QUYỀN DUY NHẤT 23 CĂN BIỆT THỰ KHU AN QUÝ VILLAS KĐT NAM CƯỜNG- HÀ ĐÔNG NHẬN NHÀ NGAY KÍ MỚI TRỰC TIẾP CĐT NAM CƯỜNG"
                    + Environment.NewLine + "1. Vị trí trung tâm hành chính -kinh tế mới của Thủ Đô nằm trong quần thể khu đô thị Dương Nội Nam Cường nằm trên trục đường trọng điểm thông Lê Quang Đạo -Mỹ Đình , ra sân bay Nội Bài chỉ 30p , ra Mỹ Đình chỉ 10 phút"
                    + Environment.NewLine + "2. Bắt đáy bất động sản khi lãi suất hạ thấp rẻ nhất trong vòng 10 năm qua ,Tháng 4/2024 thông đường Lê Quang Đạo ,Thừa hưởng hạ tầng giao thông Vành đai 3.5 , Tố Hữu -Lê Văn Lương , Đại Lộ Thăng Long ,..giá BĐS khu vực tăng tối thiểu 30% theo hạ tầng"
                    + Environment.NewLine + "Hình thức sở hữu: Sổ đỏ Lâu dài."
                    + Environment.NewLine + "3. Tiện ích hàng đầu phía Tây bao gồm 9 trường học quốc tế , Bệnh Viện Đa Khoa Quốc Tế , Gần TTTM Aeon Mall Hà Đông , Hồ thiên văn học 12ha,.."
                    + Environment.NewLine + "Thiết kế 3.5 Tầng"
                    + Environment.NewLine + "Liên hệ em tư vấn và xem dự án: Mr.Phong PGĐ Dự Án 0889 986 838"
                    + Environment.NewLine + "Cảm ơn quý khách đã đọc tin.",
                    Province = "Hà Nội",
                    Distinct = "Hà Đông",
                    Ward = "Hà Đông",
                    Street = "KĐTM Dương Nội",
                    Area = 180,
                    Price = 29500,
                    YoutubeLink = "https://youtu.be/dQw4w9WgXcQ?si=f0YnDTgYTUe6NBaY",
                    IsActive = true,
                    UserId = 1,
                    PostTypeId = 1,
                    RealEstateTypeId = 3,
                    Deleted = false,
                },
                new Post
                {
                    Id = 9,
                    Title = "Chính chủ bán toà nhà văn phòng mặt phố Lò Đúc - căn góc 230m2 8 tầng mặt tiền 9m (Thang máy + hầm)",
                    Description = "Gia đình tôi chuyển vào Sài Gòn nên cần bán tòa nhà 8 tầng mặt phố Lò Đúc, P. Đống Mác, Q. Hai Bà Trưng, Hà Nội. Căn góc 230m² - mặt tiền 9m. Tổng diện tích sàn 1500m². Vị trí đắc địa 2 mặt phố. Full nội thất văn phòng, có hầm và thang máy (Hầm để 100 xe)."
                    + Environment.NewLine + "Đầy đủ thiết bị PCCC, GPXD. Tôi đang cho thuê văn phòng dòng tiền ổn định 2.6 tỷ/năm."
                    + Environment.NewLine + "Diện tích trên sổ: 230m² - Mặt tiền 9m nở hậu."
                    + Environment.NewLine + "Vị trí cực đẹp 2 mặt phố - đối diện Tổng Cục Thuế."
                    + Environment.NewLine + "Đường Lò Đúc rộng 20m - Vỉa hè 5m kinh doanh, 4 - 5 xe ô tô đỗ thoải mái."
                    + Environment.NewLine + "Thiết kế thông sàn văn phòng diện tích đa dạng 100m² - 150m² - 200m² - 300m²/sàn."
                    + Environment.NewLine + "Giá tôi bán 125 tỷ (có thương lượng) - Liên hệ: 0859 194 555Việt Hưng)."
                    + Environment.NewLine + "Cảm ơn quý khách đã đọc tin.",
                    Province = "Hà Nội",
                    Distinct = "Hai Bà Trưng",
                    Ward = "Đống Mác",
                    Street = "Lò Đúc",
                    Area = 230,
                    Price = 125000,
                    YoutubeLink = "https://youtu.be/dQw4w9WgXcQ?si=f0YnDTgYTUe6NBaY",
                    IsActive = true,
                    UserId = 1,
                    PostTypeId = 1,
                    RealEstateTypeId = 4,
                    Deleted = false,
                },
                new Post
                {
                    Id = 10,
                    Title = "Bán nhà phố mặt tiền buôn bán sầm uất - đường Nguyễn Tư Giản - P12 - Gò Vấp - DT: 4x18m nở hậu 5,5m",
                    Description = "Nhà mặt tiền buôn bán sầm uất."
                    + Environment.NewLine + "DT: 4x18m nở hậu 5,5m."
                    + Environment.NewLine + "Diện tích trên sổ: 230m² - Mặt tiền 9m nở hậu."
                    + Environment.NewLine + "Nhà đúc kiên cố 4 tấm."
                    + Environment.NewLine + "Gồm 6 phòng ngủ, 6WC, PK. Bếp. Sân để xe hơi."
                    + Environment.NewLine + "Nhà đẹp - khu buôn bán kinh doanh đa ngành nghề."
                    + Environment.NewLine + "Liên hệ: 0909 677 159 chị Hiền."
                    + Environment.NewLine + "Cảm ơn quý khách đã đọc tin.",
                    Province = "Hồ Chí Minh",
                    Distinct = "Gò Vấp",
                    Ward = "Phường 12",
                    Street = "Nguyễn Tư Giản",
                    Area = 72,
                    Price = 9000,
                    YoutubeLink = "https://youtu.be/dQw4w9WgXcQ?si=f0YnDTgYTUe6NBaY",
                    IsActive = true,
                    UserId = 1,
                    PostTypeId = 1,
                    RealEstateTypeId = 4,
                    Deleted = false,
                },
                new Post
                {
                    Id = 11,
                    Title = "Chính chủ cần bán shophouse 5 tầng - diện tích 84m2 tại Vinhomes Ocean Park giá chỉ 12.x tỷ",
                    Description = "Do không có nhu cầu sử dụng nên gia đình cần bán căn Shophouse tại phân khu Kinh Đô Dự án Vinhomes Ocean Park."
                    + Environment.NewLine + "Diện tích đất 84m²."
                    + Environment.NewLine + "Xây dựng 70m²/sàn. Xây 5 tầng với tổng diện tích xây dựng lên đến 320m²."
                    + Environment.NewLine + "Mặt tiền rất lớn lên đến 7m."
                    + Environment.NewLine + "Vị trí đắc địa nằm tại trung tâm dự án, gần ngay sát TTTM Vincom lớn nhất miền bắc, và kế bên quảng trường rộng 3.2ha."
                    + Environment.NewLine + "Giá bán 12.X tỷ."
                    + Environment.NewLine + "Liên hệ trực tiếp xem nhà: 0931 688 898"
                    + Environment.NewLine + "Cảm ơn quý khách đã đọc tin.",
                    Province = "Hà Nội",
                    Distinct = "Gia Lâm",
                    Ward = "Dương Xá",
                    Street = "Ocean Park Gia Lâm",
                    Area = 84,
                    Price = 12000,
                    YoutubeLink = "https://youtu.be/dQw4w9WgXcQ?si=f0YnDTgYTUe6NBaY",
                    IsActive = true,
                    UserId = 1,
                    PostTypeId = 1,
                    RealEstateTypeId = 5,
                    Deleted = false,
                },
                new Post
                {
                    Id = 12,
                    Title = "Căn VIP góc Mega Grand World mặt sông đón khách đang cho thuê 115tr/ tháng, tặng VF9 trị giá 2,2 tỷ",
                    Description = "Căn VIP GÓC Mega Grand World mặt sông điểm bến đón khách du ngoạn trên sông, đang cho thuê 115tr/ tháng, tặng VF9 trị giá 2,2 tỷ."
                    + Environment.NewLine + "DT 198,7m², xây 5,5 tầng."
                    + Environment.NewLine + "Tổng giá vay: 30,603 tỷ - Vốn 30% = 9,2ty."
                    + Environment.NewLine + "Giá TTS: 24.919 tỷ."
                    + Environment.NewLine + "Tặng xe VF9."
                    + Environment.NewLine + "Thuê lại 12,5% trong 30 tháng = 3,469tỷ, thanh toán 3 tháng/lần."
                    + Environment.NewLine + "Anh chị cần căn liên hệ em Dũng 0978 476 613"
                    + Environment.NewLine + "Cảm ơn quý khách đã đọc tin.",
                    Province = "Hưng Yên",
                    Distinct = "Văn Giang",
                    Ward = "Nghĩa Trụ",
                    Street = "Mega Grand World Hà Nội",
                    Area = 198.7,
                    Price = 30600,
                    YoutubeLink = "https://youtu.be/dQw4w9WgXcQ?si=f0YnDTgYTUe6NBaY",
                    IsActive = true,
                    UserId = 1,
                    PostTypeId = 1,
                    RealEstateTypeId = 5,
                    Deleted = false,
                },
                new Post
                {
                    Id = 13,
                    Title = "Bán đất mặt tiền Tỉnh Lộ 818, Thủ Thừa, Long An. Cạnh Trung tâm hành chính Thủ Thừa Mới",
                    Description = "Vị trí: Mặt tiền đường 818, Nằm sát Cạnh Trung tâm hành chính Thủ Thừa Mới."
                    + Environment.NewLine + "Cách Chợ Thủ Thừa: 1 phút."
                    + Environment.NewLine + "Cách Quốc Lộ 1A: 5 phút."
                    + Environment.NewLine + "Cách cao tốc Trung Lương - Mỹ Thuận: 5 phút."
                    + Environment.NewLine + "Diện tích: 108m²."
                    + Environment.NewLine + "Mặt tiền đường 818 rộng 42m."
                    + Environment.NewLine + "Số Điện Thoại Liên Hệ: 0925 455 565"
                    + Environment.NewLine + "Cảm ơn quý khách đã đọc tin.",
                    Province = "Long An",
                    Distinct = "Thủ Thừa",
                    Ward = "Thị trấn Thủ Thừa",
                    Street = "Đường tỉnh lộ 818",
                    Area = 108,
                    Price = 2000,
                    YoutubeLink = "https://youtu.be/dQw4w9WgXcQ?si=f0YnDTgYTUe6NBaY",
                    IsActive = true,
                    UserId = 1,
                    PostTypeId = 1,
                    RealEstateTypeId = 6,
                    Deleted = false,
                },
                new Post
                {
                    Id = 14,
                    Title = "Bán mặt tiền đường D2A KDC Thanh Lễ, ngã tư 550, Vincom dĩ an",
                    Description = "Bán đất trục chính D2A khu dân cư The Mall City Vincom ngã tư 550."
                    + Environment.NewLine + "Diện tích 5 x 20m full thổ cư."
                    + Environment.NewLine + "Mặt tiền đường trục chính D2A và một mặt tiền phía sau là công viên."
                    + Environment.NewLine + "Đường trục chính 2 làn vỉa hè mỗi bên 5m."
                    + Environment.NewLine + "Cách ĐT 743 60m. Cách Vincom và khu chung cư đã đi vào hoạt động 300m."
                    + Environment.NewLine + "Cách ngã tư 550 300m."
                    + Environment.NewLine + "Số Điện Thoại Liên Hệ: 0925 455 565"
                    + Environment.NewLine + "Cảm ơn quý khách đã đọc tin.",
                    Province = "Bình Dương",
                    Distinct = "Dĩ An",
                    Ward = "phường Dĩ An",
                    Street = "ĐƯờng D2A",
                    Area = 100,
                    Price = 4990,
                    YoutubeLink = "https://youtu.be/dQw4w9WgXcQ?si=f0YnDTgYTUe6NBaY",
                    IsActive = true,
                    UserId = 1,
                    PostTypeId = 1,
                    RealEstateTypeId = 6,
                    Deleted = false,
                },
                new Post
                {
                    Id = 15,
                    Title = "CHủ giảm gần 3 tỷ đồng, bán gấp để xử lý tài chính trước tết 2 lô đất liền kề tặng nhà gỗ cao cấp",
                    Description = "Cần bán gấp để xử lý tài chính trước tết 02 lô đất liền kề cùng một thửa đất, tặng nhà gỗ cao cấp, đã có Giấy chứng nhận quyền sử dụng đất có đặc điểm như sau:"
                    + Environment.NewLine + "Hai mặt tiền gồm một mặt là quốc lộ 14B hiện nay đang được cải tạo, nâng cấp, đoạn qua địa bàn thành phố Đà Nẵng, con đường lớn nhất miền trung, là con đường thương mại nối liền các tỉnh miền trung với Tây nguyên, thửa đất cần bán thuộc điểm cuối tại khoảng Km32 + 185, nằm trên địa phận xã Hòa Khương, huyện Hòa Vang, thành phố Đà Nẵng."
                    + Environment.NewLine + "Đã đầu tư xây dựng biệt thự đẳng cấp sống, vườn tiểu cảnh siêu vip, hồ cá koi, sân để ô tô rộng rãi thoải mái, thiết kế tối ưu, thích hợp để ở, không khí mát mẻ trong lành, không gian xanh tự nhiên, đặc biệt đất cao ráo không sợ mưa lũ. Đối với nhà đầu tư có ý định kinh doanh thì phương án đầu tư sẽ rất thuận tiện với mô hình như nhà hàng tiệc cưới, cây xăng, cà phê vườn, siêu thị mini vì khả năng đến năm 2025 toàn huyện Hòa Vang đạt tiêu chí đô thị loại IV, đủ điều kiện trở thành thị xã trực thuộc thành phố Đà Nẵng."
                    + Environment.NewLine + "Cách trung tâm hành chính huyện Hòa Vang 500 m, nằm trong khu dân cư đông đúc, gần trường học cấp 1,2,3, gần nhiều chợ."
                    + Environment.NewLine + "Cách trung tâm thành phố Đà Nẵng chỉ 7,9 km, cách đường vào cao tốc Đà Nẵng - Quảng Ngãi 2 km."
                    + Environment.NewLine + "Cách khu du lịch núi thần tài 4 km, cách khu du lịch Bà Nà suối mơ 7 km."
                    + Environment.NewLine + "Chính chủ Chị Thư 0968 155 755, Anh Trung 0901 033 338"
                    + Environment.NewLine + "Cảm ơn quý khách đã đọc tin.",
                    Province = "Đà Nẵng",
                    Distinct = "Hòa Vang",
                    Ward = "Hòa Khương",
                    Street = "ĐƯờng Quốc lộ 14B",
                    Area = 811,
                    Price = 8200,
                    YoutubeLink = "https://youtu.be/dQw4w9WgXcQ?si=f0YnDTgYTUe6NBaY",
                    IsActive = true,
                    UserId = 1,
                    PostTypeId = 1,
                    RealEstateTypeId = 7,
                    Deleted = false,
                },
                new Post
                {
                    Id = 16,
                    Title = "Bán siêu phẩm hơn 10 ngàn m2 - gần ga cáp treo Fansipan Legend",
                    Description = "Bán siêu phẩm hơn 10 ngàn m2 - gần ga cáp treo Fansipan Legend"
                    + Environment.NewLine + "Bán siêu phẩm hơn 10 ngàn m2 - gần ga cáp treo Fansipan Legend"
                    + Environment.NewLine + "2 mặt tiền, view thung lũng. Cạnh ga cáp treo Fansipan Legend."
                    + Environment.NewLine + "Tổng diện dích: 10911m² (trong đó có 1430m² thổ cư, còn lại là đất NHK)."
                    + Environment.NewLine + "Bìa đỏ cất két, giao dịch nhanh."
                    + Environment.NewLine + "Cách khu du lịch núi thần tài 4 km, cách khu du lịch Bà Nà suối mơ 7 km."
                    + Environment.NewLine + "Chính chủ Chị Thư 0968 155 755, Anh Trung 0901 033 338"
                    + Environment.NewLine + "Cảm ơn quý khách đã đọc tin.",
                    Province = "Lào Cai",
                    Distinct = "Sa Pa",
                    Ward = "Sa Pa",
                    Street = "ĐƯờng Điện Biên Phủ",
                    Area = 10911,
                    Price = 85000,
                    YoutubeLink = "https://youtu.be/dQw4w9WgXcQ?si=f0YnDTgYTUe6NBaY",
                    IsActive = true,
                    UserId = 1,
                    PostTypeId = 1,
                    RealEstateTypeId = 8,
                    Deleted = false,
                },
                new Post
                {
                    Id = 17,
                    Title = "Bán resort Hàm Tiến, Mũi Né, Tiến Thành diện tích 1 - 3ha giá tốt",
                    Description = "Bán resort mặt biển Mũi Né."
                    + Environment.NewLine + "DT từ 1 - 3ha."
                    + Environment.NewLine + "Mặt tiền đường chính ven biển Hàm Tiến, Mũi Né, Tiến Thành."
                    + Environment.NewLine + "Biển đẹp thuộc khu du lịch quốc gia Mũi Né."
                    + Environment.NewLine + "Nhiều phòng, đang kinh doanh tốt."
                    + Environment.NewLine + "Khu phố Tây sầm uất."
                    + Environment.NewLine + "Sổ đỏ chính chủ. LH 0986 707 476 Hiệp (Zalo). Mua bán kí gửi nhà đất Phan Thiết Bình Thuận."
                    + Environment.NewLine + "Cảm ơn quý khách đã đọc tin.",
                    Province = "Bình Thuận",
                    Distinct = "Phan Thiết",
                    Ward = "Mũi Né",
                    Street = "ĐƯờng Xuân Thủy",
                    Area = 10000,
                    Price = 50000,
                    YoutubeLink = "https://youtu.be/dQw4w9WgXcQ?si=f0YnDTgYTUe6NBaY",
                    IsActive = true,
                    UserId = 1,
                    PostTypeId = 1,
                    RealEstateTypeId = 8,
                    Deleted = false,
                },
                new Post
                {
                    Id = 18,
                    Title = "Bán gấp đất xây xưởng giá rất thấp tại Thường Tân, Bắc Tân Uyên",
                    Description = "Cần bán gấp 17,653m² đất CLN đang quy hoạch sẵn SKX (làm gốm sứ, khai thác cao lanh, làm vật liệu xây dựng và các ngành liên quan). Nếu không nằm trong các ngành nghề trên thì xin chuyển qua SKC (Đã kiểm tra địa chính Bắc Tân Uyên)."
                    + Environment.NewLine + "Cách cầu Thủ Biên 4km."
                    + Environment.NewLine + "Từ cao tốc mới HL414 vào tới đất 1,100 mét (1,1km)."
                    + Environment.NewLine + "Đường đá hiện hữu 7 mét (đã quy hoạch lộ giới làm lớn thêm)."
                    + Environment.NewLine + "Chính chủ đăng bài, đang \"ngộp\" NH nên cần tìm chủ mới gấp."
                    + Environment.NewLine + "Có thương lượng cho người thiện chí nhé."
                    + Environment.NewLine + "Sổ đỏ chính chủ. LH 0986 707 476 Hiệp (Zalo). Mua bán kí gửi nhà đất Phan Thiết Bình Thuận."
                    + Environment.NewLine + "Cảm ơn quý khách đã đọc tin.",
                    Province = "Bình Dương",
                    Distinct = "Bắc Tân uyên",
                    Ward = "Thường Tân",
                    Street = "ĐƯờng HL414",
                    Area = 17654,
                    Price = 17480,
                    YoutubeLink = "https://youtu.be/dQw4w9WgXcQ?si=f0YnDTgYTUe6NBaY",
                    IsActive = true,
                    UserId = 1,
                    PostTypeId = 1,
                    RealEstateTypeId = 9,
                    Deleted = false,
                },
                new Post
                {
                    Id = 19,
                    Title = "Bán sàn thương mại tầng 1 toà CC B6 Giảng Võ quận Ba Đình",
                    Description = "Tôi cần bán sàn thương mại tầng 1 Toà CC B6 Giảng Võ dự án The Golden Armor quận Ba Đình."
                    + Environment.NewLine + "Diện tích thông thuỷ 163m², mặt tiền 11m sàn thông, chiều cao 4.3m, vị trí hai mặt đường (đã trang bị trần sàn, đèn điện điều hoà)."
                    + Environment.NewLine + "Phù hợp kinh doanh ngân hàng, phòng khám, phòng trưng bày, games, spa & fitness, nhà trẻ, trường học, trung tâm tiếng anh, nhà hàng, siêu thị, cafe..."
                    + Environment.NewLine + "Đường đá hiện hữu 7 mét (đã quy hoạch lộ giới làm lớn thêm)."
                    + Environment.NewLine + "Giá bán: Chuẩn 190 triệu/m²."
                    + Environment.NewLine + "Có thương lượng cho người thiện chí nhé."
                    + Environment.NewLine + "Liên hệ: Anh Hoàn 0946 461 166"
                    + Environment.NewLine + "Cảm ơn quý khách đã đọc tin.",
                    Province = "Hà Nội",
                    Distinct = "Ba Đình",
                    Ward = "Giảng Võ",
                    Street = "Nam Cao",
                    Area = 163,
                    Price = 30970,
                    YoutubeLink = "https://youtu.be/dQw4w9WgXcQ?si=f0YnDTgYTUe6NBaY",
                    IsActive = true,
                    UserId = 1,
                    PostTypeId = 1,
                    RealEstateTypeId = 10,
                    Deleted = false,
                },
                new Post
                {
                    Id = 20,
                    Title = "Chuyển nhượng sàn văn phòng tầng 17 tòa nhà Coninco - số 4 Tôn Thất Tùng",
                    Description = "Chuyển nhượng sàn văn phòng tại tầng 17 Tòa nhà Coninco Số 4 Tôn Thất Tùng, Trung Tự, Đống Đa, Tp. Hà Nội. Vị trí tài sản đẹp, với kiến trúc thiết kế hiện đại. Mặt sàn rộng, có thể vào sử dụng ngay."
                    + Environment.NewLine + "Tòa nhà Coninco Tower là dự án tòa văn phòng hạng B chuyên nghiệp, có đầy đủ trang thiết bị tiện ích hiện đại, nằm tại vị trí đẹp, kết nối giao thông thuận tiện."
                    + Environment.NewLine + "Phù hợp kinh doanh ngân hàng, phòng khám, phòng trưng bày, games, spa & fitness, nhà trẻ, trường học, trung tâm tiếng anh, nhà hàng, siêu thị, cafe..."
                    + Environment.NewLine + "Tiện ích đủ: 08 thang máy tốc độ cao, điều hòa âm trần hiện đại, 4 tầng hầm đỗ xe rộng rãi, BQL Tòa nhà chuyên nghiệp."
                    + Environment.NewLine + "Diện tích 665.78m² phù hợp với nhu cầu và quy mô sử dụng của nhiều doanh nghiệp."
                    + Environment.NewLine + "Có thương lượng cho người thiện chí nhé."
                    + Environment.NewLine + "Liên hệ xem văn phòng miễn phí, SĐT: 0983 681 177"
                    + Environment.NewLine + "Cảm ơn quý khách đã đọc tin.",
                    Province = "Hà Nội",
                    Distinct = "Đống Đa",
                    Ward = "Trung Tự",
                    Street = "Tôn Thât Tùng",
                    Area = 665,
                    Price = 28600,
                    YoutubeLink = "https://youtu.be/dQw4w9WgXcQ?si=f0YnDTgYTUe6NBaY",
                    IsActive = true,
                    UserId = 1,
                    PostTypeId = 1,
                    RealEstateTypeId = 10,
                    Deleted = false,
                },
                new Post
                {
                    Id = 21,
                    Title = "Q7 riverside, cho thuê căn 2PN 2WC - 8tr/th full NT 9tr/th",
                    Description = "Căn hộ 2PN 2WC 66m² là loại luôn được săn đón tại dự án Q7 Riverside bởi vì nó đáp ứng được đầy đủ các tiêu chí của 1 căn hộ gia đình."
                    + Environment.NewLine + "2PN - 8tr full NT 9tr/th."
                    + Environment.NewLine + "Phòng ngủ master với view nội khu bắt mắt, nhìn ra hồ bơi và mảng xanh của công viên dễ dàng giúp cho anh chị thư thả, thả trôi những mệt nhọc sau 1 ngày làm viêc căng thẳng."
                    + Environment.NewLine + "Nội thất đầy đủ tiện nghi, đẹp như hình anh chị chỉ cần xách vali vào là ở."
                    + Environment.NewLine + "Giá thuê 10tr/ tháng."
                    + Environment.NewLine + "Có thương lượng cho người thiện chí nhé."
                    + Environment.NewLine + "LH 0965 431 233"
                    + Environment.NewLine + "Cảm ơn quý khách đã đọc tin.",
                    Province = "Hồ Chí Minh",
                    Distinct = "Quận 7",
                    Ward = "Phú Nhuận",
                    Street = "Đào Trí",
                    Area = 66,
                    Price =8,
                    YoutubeLink = "https://youtu.be/dQw4w9WgXcQ?si=f0YnDTgYTUe6NBaY",
                    IsActive = true,
                    UserId = 1,
                    PostTypeId = 2,
                    RealEstateTypeId = 1,
                    Deleted = false,
                },
                new Post
                {
                    Id = 22,
                    Title = "Mr Hiếu - Quản lý cho thuê căn hộ Lumiere (1PN-16tr) (2PN-20tr) (3PN-33tr) miễn phí quản lý 5 năm",
                    Description = "Xin chào quý anh/chị quan tâm thuê căn hộ Lumiere Riverside tại Quận 2."
                    + Environment.NewLine + "Hiếu đang quản lý 66 căn thuê đủ loại diện tích và giá tốt với các tiêu chí nhanh nhất:"
                    + Environment.NewLine + "Văn phòng tại dự án, luôn có đội ngũ hỗ trợ 24/24 (kể cả tối muộn)."
                    + Environment.NewLine + "Sẵn nhiều chìa khóa các loại diện tích, xem đúng yêu cầu khách hàng."
                    + Environment.NewLine + "Xem nhà ngay, không cần hẹn trước."
                    + Environment.NewLine + "Có thương lượng cho người thiện chí nhé."
                    + Environment.NewLine + "Liên hệ cá nhân: 0932 700 726 Mr Hiếu - Quản lý bộ phận thuê) Hotline không ngủ: 0911 745 755 (24/24)."
                    + Environment.NewLine + "Cảm ơn quý khách đã đọc tin.",
                    Province = "Hồ Chí Minh",
                    Distinct = "Quận 2",
                    Ward = "An Phú",
                    Street = "Xa Lộ Hà Nội",
                    Area = 52,
                    Price = 16.9,
                    YoutubeLink = "https://youtu.be/dQw4w9WgXcQ?si=f0YnDTgYTUe6NBaY",
                    IsActive = true,
                    UserId = 1,
                    PostTypeId = 2,
                    RealEstateTypeId = 1,
                    Deleted = false,
                },
                new Post
                {
                    Id = 23,
                    Title = "[Ngõ Hào Nam] Cho thuê nhà nguyên căn chính chủ cách phố Giảng Võ 10' đi bộ",
                    Description = "Xin chào quý anh/chị quan tâm."
                    + Environment.NewLine + "Cho thuê nguyên căn chính chủ."
                    + Environment.NewLine + "Cho thuê nhà chính chủ mới sửa chữa trong ngõ Hào Nam, cách trung tâm Giảng Võ 10 phút đi bộ."
                    + Environment.NewLine + "Nhà 3 tầng, diện tích sử dụng 100m², có điều hòa, tủ lạnh, TV, giường, tủ cơ bản."
                    + Environment.NewLine + "Giá thuê: 11tr/tháng."
                    + Environment.NewLine + "Có thương lượng cho người thiện chí nhé."
                    + Environment.NewLine + "Liên hệ chính chủ: 0978 999 198 ms. Ly) vào giờ HC."
                    + Environment.NewLine + "Cảm ơn quý khách đã đọc tin.",
                    Province = "Hà Nội",
                    Distinct = "Đống Đa",
                    Ward = "Ô Chợ Dừa",
                    Street = "Hào Nam",
                    Area = 50,
                    Price = 11,
                    YoutubeLink = "https://youtu.be/dQw4w9WgXcQ?si=f0YnDTgYTUe6NBaY",
                    IsActive = true,
                    UserId = 1,
                    PostTypeId = 2,
                    RealEstateTypeId = 2,
                    Deleted = false,
                },
                new Post
                {
                    Id = 24,
                    Title = "Nhà riêng gần Times City cho gia đình thuê",
                    Description = "Cho thuê cả nhà riêng 3 tầng - miễn trung gian."
                    + Environment.NewLine + "Tổng diện tích 120m², 40m²/sàn, 3 phòng ngủ, 2 vệ sinh, 1 bếp, sân phơi và sân chơi."
                    + Environment.NewLine + "Nhà trong khu TT Quân Đội."
                    + Environment.NewLine + "An ninh, yên tĩnh, ô tô đỗ cửa, cách KĐT Times City 100m, gần trường chợ bệnh viện."
                    + Environment.NewLine + "Giá 8tr/tháng."
                    + Environment.NewLine + "Lưu ý: Chỉ cho hộ gia đình thuê."
                    + Environment.NewLine + "Liên hệ: 0383 655 148 - Nhà chính chủ cho thuê, không qua VP môi giới."
                    + Environment.NewLine + "Cảm ơn quý khách đã đọc tin.",
                    Province = "Hà Nội",
                    Distinct = "Hai Bà Trưng",
                    Ward = "Vĩnh Tuy",
                    Street = "Minh Khai",
                    Area = 10,
                    Price = 8,
                    YoutubeLink = "https://youtu.be/dQw4w9WgXcQ?si=f0YnDTgYTUe6NBaY",
                    IsActive = true,
                    UserId = 1,
                    PostTypeId = 2,
                    RealEstateTypeId = 2,
                    Deleted = false,
                },
                new Post
                {
                    Id = 25,
                    Title = "Cho thuê biệt thự, liền kề Vinhomes Ocean Park 2 chính thức từ CĐT, chỉ 5 tr - 8 tr/tháng",
                    Description = "CĐT Vinhomes Leasing cho thuê biệt thự, liền kề tại Vinhomes Ocean Park 2, Văn Giang, Hưng Yên."
                    + Environment.NewLine + "Vị trí: Siêu đắc địa - phù hợp để ở + kinh doanh."
                    + Environment.NewLine + "Hoàn thiện: Hoàn thiện 2 tầng full đồ (thiếu đồ điện tử)."
                    + Environment.NewLine + "Diện tích: Biệt thự - liền kề, từ 7 - 120m/sàn (nhà 5 tầng)."
                    + Environment.NewLine + "Giá thuê chỉ: 5tr - 8tr/ căn tùy từng diện tích."
                    + Environment.NewLine + "Giá cam kết rẻ nhất thị trường - ký trực tiếp với CĐT."
                    + Environment.NewLine + "Liên hệ ngay hotline phòng kinh doanh CĐT: 0968 719 555"
                    + Environment.NewLine + "Cảm ơn quý khách đã đọc tin.",
                    Province = "Hưng Yên",
                    Distinct = "Văn Giang",
                    Ward = "Long Hưng",
                    Street = "Vinhomes Ocean Park 2",
                    Area = 120,
                    Price = 5,
                    YoutubeLink = "https://youtu.be/dQw4w9WgXcQ?si=f0YnDTgYTUe6NBaY",
                    IsActive = true,
                    UserId = 1,
                    PostTypeId = 2,
                    RealEstateTypeId = 3,
                    Deleted = false,
                },
                new Post
                {
                    Id = 26,
                    Title = "CC cho thuê biệt thự Roman Plaza Tố Hữu, gần Hà Đông chỉ 26 triệu/tháng miễn trung gian",
                    Description = "Diện tích 190m² x 4 tầng, mặt tiền 11m."
                    + Environment.NewLine + "Diện tích xây dựng: 89/190m²."
                    + Environment.NewLine + "Nhà nằm ngay dưới chân chung cư Roman Plaza, trục đường nội khu, đối diện trường mầm non Shinning Star. Tập trung nhiều văn phòng công ty hàng ăn cafe,."
                    + Environment.NewLine + "Tình trạng nhà bàn giao thô, có thể sử dụng làm café, văn phòng, showroom, tùy mục đích của Khách hàng."
                    + Environment.NewLine + "Nhà thông thoáng trước sau, được thiết kế thông sàn, khách vào có thể ngăn chưa phòng được tuỳ theo mục đích sử dụng."
                    + Environment.NewLine + "Giá thuê: 26 triệu/tháng (có thương lượng với Khách hàng thiện chí và mục đích kinh doanh phù hợp với Chủ nhà)."
                    + Environment.NewLine + "Mọi chi tiết xin liên hệ: Anh Hoàng: 0898 799 988"
                    + Environment.NewLine + "Cảm ơn quý khách đã đọc tin.",
                    Province = "Hà Nội",
                    Distinct = "Nam Từ Liêm",
                    Ward = "Đại Mỗ",
                    Street = "Tố Hữu",
                    Area = 190,
                    Price = 26,
                    YoutubeLink = "https://youtu.be/dQw4w9WgXcQ?si=f0YnDTgYTUe6NBaY",
                    IsActive = true,
                    UserId = 1,
                    PostTypeId = 2,
                    RealEstateTypeId = 3,
                    Deleted = false,
                },
                new Post
                {
                    Id = 27,
                    Title = "Chính chủ cho thuê MT đường Lương Đình Của, Q2 cũ. Phù hợp kinh doanh mọi ngành nghề và mở VP cty",
                    Description = "Chính chủ cho thuê mặt bằng kinh doanh ngay mặt tiền đường Lương Đình Của Quận 2 gần Thủ Thiêm. Đối diện toà nhà chung cư, trường học và khu dân cư đông đúc. Phù hợp với mọi loại hình kinh doanh."
                    + Environment.NewLine + "Mặt bằng tầng 1 diện tích 5x16m và 1/2 hầm bên trong 5m x 10m và được treo biển quảng cáo trên tầng 5 diện tích hơn 20m². Vị trí biển quảng cáo thoáng và không che."
                    + Environment.NewLine + "Mặt bằng có vỉa hè rộng rãi, đối diện chung cư."
                    + Environment.NewLine + "Có hầm để xe rộng và thoáng có thể đậu được xe oto."
                    + Environment.NewLine + "5x21m sàn trệt, có phòng ở lại, 1WC."
                    + Environment.NewLine + "Giá 16tr/tháng giá tốt nhất khu vực Lương Đình Của. Chủ dễ tính gọi xem trước 30p là có thể đến xem mặt bằng được."
                    + Environment.NewLine + "Mọi chi tiết xin liên hệ: 0931321168"
                    + Environment.NewLine + "Cảm ơn quý khách đã đọc tin.",
                    Province = "Hồ Chí Minh",
                    Distinct = "Thủ Đức",
                    Ward = "An Khánh",
                    Street = "181 Lương Định Của",
                    Area = 70,
                    Price = 16,
                    YoutubeLink = "https://youtu.be/dQw4w9WgXcQ?si=f0YnDTgYTUe6NBaY",
                    IsActive = true,
                    UserId = 1,
                    PostTypeId = 2,
                    RealEstateTypeId = 4,
                    Deleted = false,
                },
                new Post
                {
                    Id = 28,
                    Title = "Cho thuê nhà cấp 4 gần Aeon, bến xe Miền Tây",
                    Description = "Cho thuê nhà cấp 4 gần Aeon, bến xe Miền Tây"
                    + Environment.NewLine + "Cho thuê nhà cấp 4 có gác, địa chỉ: 58 đường Số 1B, P Bình Trị Đông B, Q Bình Tân"
                    + Environment.NewLine + "(Khu Tên Lửa, gần Aeon, bến xe Miền Tây)."
                    + Environment.NewLine + "Có hầm để xe rộng và thoáng có thể đậu được xe oto."
                    + Environment.NewLine + "Diện tích: 80m²."
                    + Environment.NewLine + "Giá cho thuê: 10tr/tháng."
                    + Environment.NewLine + "Số ĐT liên hệ: 0915 887 768"
                    + Environment.NewLine + "Cảm ơn quý khách đã đọc tin.",
                    Province = "Hồ Chí Minh",
                    Distinct = "Bình Tân",
                    Ward = "Bình Trị Đông B",
                    Street = "1B",
                    Area = 80,
                    Price = 10,
                    YoutubeLink = "https://youtu.be/dQw4w9WgXcQ?si=f0YnDTgYTUe6NBaY",
                    IsActive = true,
                    UserId = 1,
                    PostTypeId = 2,
                    RealEstateTypeId = 4,
                    Deleted = false,
                },
                new Post
                {
                    Id = 29,
                    Title = "Chuyên cho thuê phòng trong CHCC Era Town Đức Khải - Q7 nhà sạch sẽ, view thoáng đẹp",
                    Description = "Cho thuê phòng full nội thất trong căn hộ chung cư Era Town Đức Khải - Q7. Nhà mới, view thoáng đẹp."
                    + Environment.NewLine + "Vị trí: Quận 7 (liền kề Phú Mỹ Hưng)."
                    + Environment.NewLine + "Có hồ bơi, gym, công viên, cafe, dịch vụ ăn uống, giải trí..."
                    + Environment.NewLine + "Gần trường học, siêu thị, bệnh viện, rạp chiếu phim galaxy. Đặc biệt chỉ cần 8 phút đến ngay trung tâm Phú Mỹ Hưng."
                    + Environment.NewLine + "Giá thuê phòng chỉ từ 1,8 triệu đến 3,5 triệu/ tháng."
                    + Environment.NewLine + "Phí điện nước, wifi chỉ với 350k đến 450k/người."
                    + Environment.NewLine + "Xem phòng thực tế liên hệ: 0911 167 711"
                    + Environment.NewLine + "Cảm ơn quý khách đã đọc tin.",
                    Province = "Hồ Chí Minh",
                    Distinct = "Quận 7",
                    Ward = " Phú Mỹ",
                    Street = "Dự án The Era Town",
                    Area = 10,
                    Price = 1.7,
                    YoutubeLink = "https://youtu.be/dQw4w9WgXcQ?si=f0YnDTgYTUe6NBaY",
                    IsActive = true,
                    UserId = 1,
                    PostTypeId = 2,
                    RealEstateTypeId = 11,
                    Deleted = false,
                },
                new Post
                {
                    Id = 30,
                    Title = "Chính chủ cho thuê phòng mới, đẹp, rẻ - full đồ ngõ 199 Hồ Tùng Mậu",
                    Description = "Hiện tôi còn 1 phòng cho thuê để ở hoặc kd online."
                    + Environment.NewLine + "Cụ thể: Diện tích phòng 30 m². Giường, Tủ quần áo 3 cánh, mới, bàn bếp, điều hòa âm trần, tủ lạnh. Khép kín. Phòng ở tầng 2. Thang máy và thang bộ chủ động."
                    + Environment.NewLine + "Nhà mới, đồ mới, thang máy xịn sò, an ninh, văn minh, có máy giặt, máy sấy dưới tầng 1."
                    + Environment.NewLine + "Giá: 4tr5 /phòng (KMC)."
                    + Environment.NewLine + "Khu vực phố Hồ Tùng Mậu, Nguyễn Đổng Chi, P Cầu Diễn. Rất thuận lợi giao thông, đường, trường, trạm, chợ dân sinh..."
                    + Environment.NewLine + "Phí điện nước, wifi chỉ với 350k đến 450k/người."
                    + Environment.NewLine + "Liên hệ chính chủ: 0987 836 866"
                    + Environment.NewLine + "Cảm ơn quý khách đã đọc tin.",
                    Province = "Hà Nội",
                    Distinct = "Nam Từ Liêm",
                    Ward = "Cầu Diễn",
                    Street = "Hồ Tùng Mậu",
                    Area = 30,
                    Price = 4.5,
                    YoutubeLink = "https://youtu.be/dQw4w9WgXcQ?si=f0YnDTgYTUe6NBaY",
                    IsActive = true,
                    UserId = 1,
                    PostTypeId = 2,
                    RealEstateTypeId = 11,
                    Deleted = false,
                },
                new Post
                {
                    Id = 31,
                    Title = "Cho thuê nhà phố thương mại, shophouse khối đế tại Gò Vấp - chính chủ Cityland Group",
                    Description = "Chính chủ CityLand Group tung giỏ hàng cho thuê Nhà phố thương mại, Shophouse khối đế tại dự án CityLand Park Hills Gò Vấp."
                    + Environment.NewLine + "Dự án CityLand Park Hills từ lâu đã trở thành biểu tượng của Quận Gò Vấp khi sở hữu vị trí đắc địa trung tâm quận Gò Vấp, nằm tiếp giáp với các trục đường lớn: Phan Văn Trị, Nguyễn Văn Lượng, Thống Nhất - nơi có mật độ cư dân sinh sống, làm việc, giao thương sầm uất."
                    + Environment.NewLine + "Nằm trong khu dân cư hiện hữu với hơn 2.000 hộ dân và 12.000 cư dân, Nhà Phố Thương Mại và Shophouse khối đế trong dự án CityLand Park Hills luôn nhận được sự săn đón từ các nhà đầu tư, doanh nghiệp lớn nhỏ với mục tiêu mở rộng thị trường tăng doanh thu, thu hút được nhiều thương hiệu lớn đã có mặt tại đây như: Lotte Mart, E - Mart, Winmart, Pharmacity, Bách Hóa Xanh, Ministop, Phuc Long,..."
                    + Environment.NewLine + "Số tầng: 5 (1 trệt, 4 lầu)."
                    + Environment.NewLine + "Diện tích: 396 m² - 528 m²."
                    + Environment.NewLine + "Tổng căn cho thuê: 17 căn."
                    + Environment.NewLine + "Liên hệ hotline 1900 56 56 33 để xem trực tiếp mặt bằng và nhận chính sách thuê hấp dẫn từ chủ đầu tư CityLand Group."
                    + Environment.NewLine + "Cảm ơn quý khách đã đọc tin.",
                    Province = "Hồ Chí Minh",
                    Distinct = "Gò Vấp",
                    Ward = "Phường 10",
                    Street = "Phan Văn Trị",
                    Area = 75,
                    Price = 15,
                    YoutubeLink = "https://youtu.be/dQw4w9WgXcQ?si=f0YnDTgYTUe6NBaY",
                    IsActive = true,
                    UserId = 1,
                    PostTypeId = 2,
                    RealEstateTypeId = 5,
                    Deleted = false,
                },
                new Post
                {
                    Id = 32,
                    Title = "Nhà phố Lakeview city cần cho thuê giá chỉ 25-38tr/th nội thất đẹp, shophous giá 35tr/th.",
                    Description = "DT: 5x20m nội thất cơ bản giá 25tr/tháng full nội thất."
                    + Environment.NewLine + "DT: 5x20m full nội thất giá 35tr/tháng, view công viên."
                    + Environment.NewLine + "DT: 8.6x20m đầy đủ nội thất giá 32tr/tháng."
                    + Environment.NewLine + "DT: 8x20m nội thất cơ bản giá 28tr/th view công viên."
                    + Environment.NewLine + "DT: 5x20m 1 trệt 1 lửng 1 lầu giá 16tr/th."
                    + Environment.NewLine + "DT: 7x20m cho thuê 1 trệt 1 lửng 3 lầu, khu kinh doanh cafe ăn uống sầm uất."
                    + Environment.NewLine + "LH: 0917 330 220 hỗ trợ anh chị xem nhà thực tế 24/7"
                    + Environment.NewLine + "Cảm ơn quý khách đã đọc tin.",
                    Province = "Hồ Chí Minh",
                    Distinct = "Gò Vấp",
                    Ward = "Phường 10",
                    Street = "Lakeview",
                    Area = 100,
                    Price = 25,
                    YoutubeLink = "https://youtu.be/dQw4w9WgXcQ?si=f0YnDTgYTUe6NBaY",
                    IsActive = true,
                    UserId = 1,
                    PostTypeId = 2,
                    RealEstateTypeId = 5,
                    Deleted = false,
                },
                new Post
                {
                    Id = 33,
                    Title = "Chính chủ cho thuê văn phòng Phường Cao Ông Lãnh, Quận 1",
                    Description = "Địa chỉ: 23 Cô Giang, Phường Cao Ông Lãnh, Quận 1, TP Hồ Chí Minh."
                    + Environment.NewLine + "Diện tích: 4m x 15m = 60m²."
                    + Environment.NewLine + "Thời gian: HĐ từ 2 năm trở lên."
                    + Environment.NewLine + "Giá thuê: 20 triệu/tháng."
                    + Environment.NewLine + "Tiện nghi đầy đủ."
                    + Environment.NewLine + "Mặt bằng kinh doanh phù hợp mở nhà thuốc, shop, đai lý, cửa hàng, VPDĐ,..."
                    + Environment.NewLine + "Liên hệ 0909 301 260"
                    + Environment.NewLine + "Cảm ơn quý khách đã đọc tin.",
                    Province = "Hồ Chí Minh",
                    Distinct = "Quận 1",
                    Ward = "Cầu Ông Lãnh",
                    Street = "Cô Giang",
                    Area = 60,
                    Price = 20,
                    YoutubeLink = "https://youtu.be/dQw4w9WgXcQ?si=f0YnDTgYTUe6NBaY",
                    IsActive = true,
                    UserId = 1,
                    PostTypeId = 2,
                    RealEstateTypeId = 12,
                    Deleted = false,
                },
                new Post
                {
                    Id = 34,
                    Title = "Cho thuê văn phòng từ 100m2-2200m2 miễn phí quản lý, ưu đãi tết 2024 tại 23 trần Cao Vân Q.1",
                    Description = "Cho thuê văn phòng mới tinh tại tòa nhà 23 Trần Cao Vân, P. Dakao , Q. 1 tòa nhà nằm tại vị trí đắc địa ngay trung tâm sầm uất Q.1 kết nối các quận 1, 2,.4,5,6,7,8... và TP. Thủ Đức, rất thuận tiện giao dịch và được quản lý chuyên nghiệp cũng với các dịch vụ uy tín chắc chắn sẽ là địa chỉ phù hợp cho doanh nghiệp khi thuê làm trụ sở giao dịch."
                    + Environment.NewLine + "Điều hoà nhiệt độ mới 100%."
                    + Environment.NewLine + "Hệ thống phòng cháy chữa cháy hiện đại, thiết bị tự động."
                    + Environment.NewLine + "Thiết bị WC: Mới tinh."
                    + Environment.NewLine + "Tiện nghi đầy đủ."
                    + Environment.NewLine + "Dịch vụ bảo vệ 24/7."
                    + Environment.NewLine + "Hotline hỗ trợ: 0916 300 022"
                    + Environment.NewLine + "Cảm ơn quý khách đã đọc tin.",
                    Province = "Hồ Chí Minh",
                    Distinct = "Quận 1",
                    Ward = "Đa Kao",
                    Street = "23 Trần Cao Vân",
                    Area = 230,
                    Price = 70,
                    YoutubeLink = "https://youtu.be/dQw4w9WgXcQ?si=f0YnDTgYTUe6NBaY",
                    IsActive = true,
                    UserId = 1,
                    PostTypeId = 2,
                    RealEstateTypeId = 12,
                    Deleted = false,
                },
                new Post
                {
                    Id = 35,
                    Title = "Chính chủ cho thuê mặt bằng kinh doanh Phường Cao Ông Lãnh, Quận 1",
                    Description = "Địa chỉ: 23 Cô Giang, Phường Cao Ông Lãnh, Quận 1, TP Hồ Chí Minh."
                    + Environment.NewLine + "Diện tích: 4m x 15m = 60m²."
                    + Environment.NewLine + "Thời gian: HĐ từ 2 năm trở lên."
                    + Environment.NewLine + "Giá thuê: 20 triệu/tháng."
                    + Environment.NewLine + "Tiện nghi đầy đủ."
                    + Environment.NewLine + "Mặt bằng kinh doanh phù hợp mở nhà thuốc, shop, đai lý, cửa hàng, VPDĐ,..."
                    + Environment.NewLine + "Liên hệ 0909 301 260"
                    + Environment.NewLine + "Cảm ơn quý khách đã đọc tin.",
                    Province = "Hồ Chí Minh",
                    Distinct = "Quận 1",
                    Ward = "Cầu Cao Lãnh",
                    Street = "Cô Giang",
                    Area = 60,
                    Price = 20,
                    YoutubeLink = "https://youtu.be/dQw4w9WgXcQ?si=f0YnDTgYTUe6NBaY",
                    IsActive = true,
                    UserId = 1,
                    PostTypeId = 2,
                    RealEstateTypeId = 13,
                    Deleted = false,
                },
                new Post
                {
                    Id = 36,
                    Title = "Cho thuê mặt bằng làm Phòng giao dịch Ngân hàng, Siêu thị Nguyên Khê, Đông Anh",
                    Description = "Vị Trí Lô góc mặt phố Lê Hữu Tựu, Nguyên Khê Đông anh."
                    + Environment.NewLine + "đi vào Nội Thành 25p, ra Sân bay Nội bài 5p, ra cầu Nhật Tân 10p, cách QL3 10p"
                    + Environment.NewLine + "Mặt Bằng 2 tầng, mỗi tầng ~450m² nằm trong khuôn viên 3ha."
                    + Environment.NewLine + "phù hợp làm siêu thị, Cửa hàng, phòng Giao dịch ngân hàng, bưu tá điện, Gara, cửa hàng xe điện xe máyhàng gia dụng"
                    + Environment.NewLine + "Tiện nghi đầy đủ."
                    + Environment.NewLine + "Giá thuê 95k/m² hoàn thiện trọn gói. Đủ Thuế phí."
                    + Environment.NewLine + "Liên hệ 0982 782 807"
                    + Environment.NewLine + "Cảm ơn quý khách đã đọc tin.",
                    Province = "Hà Nội",
                    Distinct = "Đông Anh",
                    Ward = "Nguyên Khê",
                    Street = "Lê Hữu Tựu",
                    Area = 450,
                    Price = 43,
                    YoutubeLink = "https://youtu.be/dQw4w9WgXcQ?si=f0YnDTgYTUe6NBaY",
                    IsActive = true,
                    UserId = 1,
                    PostTypeId = 2,
                    RealEstateTypeId = 13,
                    Deleted = false,
                },
                new Post
                {
                    Id = 37,
                    Title = "Kho riêng (tự quản), kho chung có thủ kho quản lý và nhà xưởng từ: 5m2 đến 50,000m2 giá 60,000đ/m2",
                    Description = " cho thuê kho trong và ngoài khu công nghiêp (khu chế xuất quận 7). Kho riêng (tự quản), kho chung có thủ kho quản lý và nhà xưởng: Diện tích từ 150m². 300m², 500m², 1000m², 2000m², 3000m3, 4000m², 50,000m². Diện tích theo yêu cầu khách hàng."
                    + Environment.NewLine + "Diện tích thuê có thể thay đổi theo mùa vụ, giúp bạn mở rộng quy mô kinh doanh, lưu trữ mà không cần lo về giới hạn diện tích kho. (Tấn, Pallet, m3)."
                    + Environment.NewLine + "Số liệu Xuất - Nhập báo cáo chính xác định kỳ giúp bạn kiểm soát hàng hóa chặt chẽ."
                    + Environment.NewLine + "Hợp đồng thuê kho linh động theo tuần - tháng - quý tùy nhu cầu doanh nghiệp."
                    + Environment.NewLine + "Chi phí thuê cạnh tranh nhất khu vực, đa dạng diện tích xây dựng theo yêu cầu khách hàng."
                    + Environment.NewLine + "Giá: Từ 50,000đ/m²/ tháng đến 110,000đ/m²/thang."
                    + Environment.NewLine + "LH: 0936 211 728"
                    + Environment.NewLine + "Cảm ơn quý khách đã đọc tin.",
                    Province = "Hồ Chí Minh",
                    Distinct = "Quận 7",
                    Ward = "Tân Thuận Đông",
                    Street = "Nguyễn Văn Linh",
                    Area = 1000,
                    Price = 50,
                    YoutubeLink = "https://youtu.be/dQw4w9WgXcQ?si=f0YnDTgYTUe6NBaY",
                    IsActive = true,
                    UserId = 1,
                    PostTypeId = 2,
                    RealEstateTypeId = 9,
                    Deleted = false,
                },
                new Post
                {
                    Id = 38,
                    Title = "Chính chủ cho thuê kho 2000m2, đường xe công 24h - vòng xoay An Lạc",
                    Description = "Tổng diện tích: 2000m², nhà kho 1720m² còn lại sân và VP."
                    + Environment.NewLine + "Nhà kho thép tiền chế cao thoáng, đẹp tôn còn mới sạch sẽ, thích hợp làm kho hoặc sản xuất"
                    + Environment.NewLine + "Container về tận kho."
                    + Environment.NewLine + "Trạm điện 300KVA."
                    + Environment.NewLine + "PCCC vách tường."
                    + Environment.NewLine + "Đường xe container tự do."
                    + Environment.NewLine + "LH: 0936 211 728"
                    + Environment.NewLine + "Cảm ơn quý khách đã đọc tin.",
                    Province = "Hồ Chí Minh",
                    Distinct = "Bình Chánh",
                    Ward = "Tân Kiên",
                    Street = "Quốc lộ 1A",
                    Area = 2000,
                    Price = 170,
                    YoutubeLink = "https://youtu.be/dQw4w9WgXcQ?si=f0YnDTgYTUe6NBaY",
                    IsActive = true,
                    UserId = 1,
                    PostTypeId = 2,
                    RealEstateTypeId = 9,
                    Deleted = false,
                },
                new Post
                {
                    Id = 39,
                    Title = "BQL tòa nhà cần cho thuê sàn sân thượng rooftop 170m2 view Landmark 81, P. 25, Bình Thạnh",
                    Description = "BQL tòa nhà Savista Realty Ung Văn Khiêm cần cho thuê sàn sân thượng view Landmark 81, phù hợp kinh doanh cafe rooftop, lounge,..."
                    + Environment.NewLine + "Vị trí: Hẻm 677 Điện Biên Phủ, phường 25, quận Bình Thạnh."
                    + Environment.NewLine + "Địa chỉ: 400/8A Ung Văn Khiêm, Bình Thạnh."
                    + Environment.NewLine + "Quy mô tòa nhà: 1 hầm, trệt, 6 tầng văn phòng, sân thượng; 1 thang máy 1 thang bộ và thang thoát hiểm."
                    + Environment.NewLine + "Diện tích sàn: 210m²."
                    + Environment.NewLine + "Tiện ích tại tòa nhà: Sảnh lễ tân; hoàn thiện trần và sàn; hệ thống chiếu sáng cùng điều hòa trung tâm; thang thoát hiểm và hệ thống PCCC đạt chuẩn; máy phát điện, an ninh 24/7,..."
                    + Environment.NewLine + "LH: 0936 211 728"
                    + Environment.NewLine + "Cảm ơn quý khách đã đọc tin.",
                    Province = "Hồ Chí Minh",
                    Distinct = "Bình Thạnh",
                    Ward = "phường 25",
                    Street = "Ung Văn Khiêm",
                    Area = 170,
                    Price = 45,
                    YoutubeLink = "https://youtu.be/dQw4w9WgXcQ?si=f0YnDTgYTUe6NBaY",
                    IsActive = true,
                    UserId = 1,
                    PostTypeId = 2,
                    RealEstateTypeId = 10,
                    Deleted = false,
                },
                new Post
                {
                    Id = 40,
                    Title = "Cho thuê sân thượng toà nhà Khu Cư Xá Ngân Hàng Phường Tân Thuận Tây Quận 7",
                    Description = "Cho thuê sân thượng toà nhà Khu Cư Xá Ngân Hàng Phường Tân Thuận Tây Quận 7."
                    + Environment.NewLine + "Diện tích: 12 x 20m."
                    + Environment.NewLine + "Tiện làm rooftop, BBQ sân thượng. Cho thuê dài hạn."
                    + Environment.NewLine + "Giá: 26 triệu/tháng. Thang máy lên tới nơi."
                    + Environment.NewLine + "Đc: 41 Đường Số 4F Cư Xá Ngân Hàng P Tân Thuận Tây Q7."
                    + Environment.NewLine + "Tiện ích tại tòa nhà: Sảnh lễ tân; hoàn thiện trần và sàn; hệ thống chiếu sáng cùng điều hòa trung tâm; thang thoát hiểm và hệ thống PCCC đạt chuẩn; máy phát điện, an ninh 24/7,..."
                    + Environment.NewLine + "Liên hệ: 0902 808 988 Chính chủ."
                    + Environment.NewLine + "Cảm ơn quý khách đã đọc tin.",
                    Province = "Hồ Chí Minh",
                    Distinct = "Quận 7",
                    Ward = "Tân Thuận Tây",
                    Street = "số 4F",
                    Area = 240,
                    Price = 26,
                    YoutubeLink = "https://youtu.be/dQw4w9WgXcQ?si=f0YnDTgYTUe6NBaY",
                    IsActive = true,
                    UserId = 1,
                    PostTypeId = 2,
                    RealEstateTypeId = 10,
                    Deleted = false,
                });
            #endregion
            
            #region Media
            modelBuilder.Entity<Media>().HasData(
                new Media
                {
                    Id = 1,
                    Name = "Ảnh minh họa",
                    Description = "mô tả",
                    MediaUrl = "https://file4.batdongsan.com.vn/2023/11/23/20231123150348-b45c_wm.jpg",
                    PostId = 1,
                    Deleted = false,
                },
                new Media
                {
                    Id = 2,
                    Name = "Ảnh minh họa",
                    Description = "mô tả",
                    MediaUrl = "https://file4.batdongsan.com.vn/2023/11/22/20231122121254-2b83_wm.jpg",
                    PostId = 1,
                    Deleted = false,
                },
                new Media
                {
                    Id = 3,
                    Name = "Ảnh minh họa",
                    Description = "mô tả",
                    MediaUrl = "https://file4.batdongsan.com.vn/2022/06/29/20220629105759-e328_wm.jpg",
                    PostId = 1,
                    Deleted = false,
                },
                new Media
                {
                    Id = 4,
                    Name = "Ảnh minh họa",
                    Description = "mô tả",
                    MediaUrl = "https://file4.batdongsan.com.vn/2022/06/29/20220629105834-69cb_wm.jpg",
                    PostId = 1,
                    Deleted = false,
                },
                new Media
                {
                    Id = 5,
                    Name = "Ảnh minh họa",
                    Description = "mô tả",
                    MediaUrl = "https://file4.batdongsan.com.vn/2024/01/19/20240119142840-edac_wm.jpg",
                    PostId = 2,
                    Deleted = false,
                },
                new Media
                {
                    Id = 6,
                    Name = "Ảnh minh họa",
                    Description = "mô tả",
                    MediaUrl = "https://file4.batdongsan.com.vn/2024/01/19/20240119142840-05ce_wm.jpg",
                    PostId = 2,
                    Deleted = false,
                },
                new Media
                {
                    Id = 7,
                    Name = "Ảnh minh họa",
                    Description = "mô tả",
                    MediaUrl = "https://file4.batdongsan.com.vn/2024/01/19/20240119142840-1f42_wm.jpg",
                    PostId = 2,
                    Deleted = false,
                },
                new Media
                {
                    Id = 8,
                    Name = "Ảnh minh họa",
                    Description = "mô tả",
                    MediaUrl = "https://file4.batdongsan.com.vn/2024/01/19/20240119142840-3925_wm.jpg",
                    PostId = 2,
                    Deleted = false,
                },
                new Media
                {
                    Id = 9,
                    Name = "Ảnh minh họa",
                    Description = "mô tả",
                    MediaUrl = "https://file4.batdongsan.com.vn/2021/12/03/20211203130418-4d63_wm.jpg",
                    PostId = 3,
                    Deleted = false,
                },
                new Media
                {
                    Id = 10,
                    Name = "Ảnh minh họa",
                    Description = "mô tả",
                    MediaUrl = "https://file4.batdongsan.com.vn/2021/12/03/20211203130418-b4b8_wm.jpg",
                    PostId = 3,
                    Deleted = false,
                },
                new Media
                {
                    Id = 11,
                    Name = "Ảnh minh họa",
                    Description = "mô tả",
                    MediaUrl = "https://file4.batdongsan.com.vn/2021/12/03/20211203130418-af62_wm.jpg",
                    PostId = 3,
                    Deleted = false,
                },
                new Media
                {
                    Id = 12,
                    Name = "Ảnh minh họa",
                    Description = "mô tả",
                    MediaUrl = "https://file4.batdongsan.com.vn/2023/04/20/20230420193223-b91d_wm.jpg",
                    PostId = 3,
                    Deleted = false,
                },
                new Media
                {
                    Id = 13,
                    Name = "Ảnh minh họa",
                    Description = "mô tả",
                    MediaUrl = "https://file4.batdongsan.com.vn/2024/01/16/20240116202238-9ac7_wm.jpg",
                    PostId = 4,
                    Deleted = false,
                },
                new Media
                {
                    Id = 14,
                    Name = "Ảnh minh họa",
                    Description = "mô tả",
                    MediaUrl = "https://file4.batdongsan.com.vn/2024/01/16/20240116202238-ebdd_wm.jpg",
                    PostId = 4,
                    Deleted = false,
                },
                new Media
                {
                    Id = 15,
                    Name = "Ảnh minh họa",
                    Description = "mô tả",
                    MediaUrl = "https://file4.batdongsan.com.vn/2024/01/16/20240116202239-2ffd_wm.jpg",
                    PostId = 4,
                    Deleted = false,
                },
                new Media
                {
                    Id = 16,
                    Name = "Ảnh minh họa",
                    Description = "mô tả",
                    MediaUrl = "https://file4.batdongsan.com.vn/2024/01/16/20240116202337-447e_wm.jpg",
                    PostId = 4,
                    Deleted = false,
                },
                new Media
                {
                    Id = 17,
                    Name = "Ảnh minh họa",
                    Description = "mô tả",
                    MediaUrl = "https://file4.batdongsan.com.vn/2024/01/17/20240117223719-abf7_wm.jpg",
                    PostId = 5,
                    Deleted = false,
                },
                new Media
                {
                    Id = 18,
                    Name = "Ảnh minh họa",
                    Description = "mô tả",
                    MediaUrl = "https://file4.batdongsan.com.vn/2024/01/17/20240117223717-ca71_wm.jpg",
                    PostId = 5,
                    Deleted = false,
                },
                new Media
                {
                    Id = 19,
                    Name = "Ảnh minh họa",
                    Description = "mô tả",
                    MediaUrl = "https://file4.batdongsan.com.vn/2024/01/17/20240117223717-121c_wm.jpg",
                    PostId = 5,
                    Deleted = false,
                },
                new Media
                {
                    Id = 20,
                    Name = "Ảnh minh họa",
                    Description = "mô tả",
                    MediaUrl = "https://file4.batdongsan.com.vn/2024/01/17/20240117223717-bc47_wm.jpg",
                    PostId = 5,
                    Deleted = false,
                },
                new Media
                {
                    Id = 21,
                    Name = "Ảnh minh họa",
                    Description = "mô tả",
                    MediaUrl = "https://file4.batdongsan.com.vn/2024/01/17/20240117120010-aaf0_wm.jpg",
                    PostId = 6,
                    Deleted = false,
                },
                new Media
                {
                    Id = 22,
                    Name = "Ảnh minh họa",
                    Description = "mô tả",
                    MediaUrl = "https://file4.batdongsan.com.vn/2024/01/17/20240117120029-0389_wm.jpg",
                    PostId = 6,
                    Deleted = false,
                },
                new Media
                {
                    Id = 23,
                    Name = "Ảnh minh họa",
                    Description = "mô tả",
                    MediaUrl = "https://file4.batdongsan.com.vn/2024/01/17/20240117120029-493a_wm.jpg",
                    PostId = 6,
                    Deleted = false,
                },
                new Media
                {
                    Id = 24,
                    Name = "Ảnh minh họa",
                    Description = "mô tả",
                    MediaUrl = "https://file4.batdongsan.com.vn/2024/01/17/20240117120029-4d91_wm.jpg",
                    PostId = 6,
                    Deleted = false,
                },
                new Media
                {
                    Id = 25,
                    Name = "Ảnh minh họa",
                    Description = "mô tả",
                    MediaUrl = "https://file4.batdongsan.com.vn/2024/01/18/20240118155154-b4a7_wm.jpg",
                    PostId = 7,
                    Deleted = false,
                },
                new Media
                {
                    Id = 26,
                    Name = "Ảnh minh họa",
                    Description = "mô tả",
                    MediaUrl = "https://file4.batdongsan.com.vn/2024/01/18/20240118155222-6375_wm.jpg",
                    PostId = 7,
                    Deleted = false,
                },
                new Media
                {
                    Id = 27,
                    Name = "Ảnh minh họa",
                    Description = "mô tả",
                    MediaUrl = "https://file4.batdongsan.com.vn/2024/01/18/20240118155301-7c24_wm.jpg",
                    PostId = 7,
                    Deleted = false,
                },
                new Media
                {
                    Id = 28,
                    Name = "Ảnh minh họa",
                    Description = "mô tả",
                    MediaUrl = "https://file4.batdongsan.com.vn/2024/01/18/20240118155945-733a_wm.jpg",
                    PostId = 7,
                    Deleted = false,
                },
                new Media
                {
                    Id = 29,
                    Name = "Ảnh minh họa",
                    Description = "mô tả",
                    MediaUrl = "https://file4.batdongsan.com.vn/2024/01/18/20240118091823-ed33_wm.jpg",
                    PostId = 8,
                    Deleted = false,
                },
                new Media
                {
                    Id = 30,
                    Name = "Ảnh minh họa",
                    Description = "mô tả",
                    MediaUrl = "https://file4.batdongsan.com.vn/2024/01/18/20240118091824-5c18_wm.jpg",
                    PostId = 8,
                    Deleted = false,
                },
                new Media
                {
                    Id = 31,
                    Name = "Ảnh minh họa",
                    Description = "mô tả",
                    MediaUrl = "https://file4.batdongsan.com.vn/2024/01/18/20240118091824-032e_wm.jpg",
                    PostId = 8,
                    Deleted = false,
                },
                new Media
                {
                    Id = 32,
                    Name = "Ảnh minh họa",
                    Description = "mô tả",
                    MediaUrl = "https://file4.batdongsan.com.vn/2024/01/18/20240118091828-08db_wm.jpg",
                    PostId = 8,
                    Deleted = false,
                },
                new Media
                {
                    Id = 33,
                    Name = "Ảnh minh họa",
                    Description = "mô tả",
                    MediaUrl = "https://file4.batdongsan.com.vn/2023/12/07/20231207182515-b58c_wm.jpg",
                    PostId = 9,
                    Deleted = false,
                },
                new Media
                {
                    Id = 34,
                    Name = "Ảnh minh họa",
                    Description = "mô tả",
                    MediaUrl = "https://file4.batdongsan.com.vn/2023/12/07/20231207182213-71af_wm.jpg",
                    PostId = 9,
                    Deleted = false,
                },
                new Media
                {
                    Id = 35,
                    Name = "Ảnh minh họa",
                    Description = "mô tả",
                    MediaUrl = "https://file4.batdongsan.com.vn/2023/12/07/20231207182553-5c9d_wm.jpg",
                    PostId = 9,
                    Deleted = false,
                },
                new Media
                {
                    Id = 36,
                    Name = "Ảnh minh họa",
                    Description = "mô tả",
                    MediaUrl = "https://file4.batdongsan.com.vn/2023/12/07/20231207182213-c1fb_wm.jpg",
                    PostId = 9,
                    Deleted = false,
                },
                new Media
                {
                    Id = 37,
                    Name = "Ảnh minh họa",
                    Description = "mô tả",
                    MediaUrl = "https://file4.batdongsan.com.vn/2023/06/15/20230615083822-f080_wm.jpg",
                    PostId = 10,
                    Deleted = false,
                },
                new Media
                {
                    Id = 38,
                    Name = "Ảnh minh họa",
                    Description = "mô tả",
                    MediaUrl = "https://file4.batdongsan.com.vn/2023/06/15/20230615083905-68eb_wm.jpg",
                    PostId = 10,
                    Deleted = false,
                },
                new Media
                {
                    Id = 39,
                    Name = "Ảnh minh họa",
                    Description = "mô tả",
                    MediaUrl = "https://file4.batdongsan.com.vn/2023/06/15/20230615083905-6a96_wm.jpg",
                    PostId = 10,
                    Deleted = false,
                },
                new Media
                {
                    Id = 40,
                    Name = "Ảnh minh họa",
                    Description = "mô tả",
                    MediaUrl = "https://file4.batdongsan.com.vn/2023/06/15/20230615083905-fe54_wm.jpg",
                    PostId = 10,
                    Deleted = false,
                },
                new Media
                {
                    Id = 41,
                    Name = "Ảnh minh họa",
                    Description = "mô tả",
                    MediaUrl = "https://file4.batdongsan.com.vn/2024/01/04/20240104225053-cc0f_wm.jpg",
                    PostId = 11,
                    Deleted = false,
                },
                new Media
                {
                    Id = 42,
                    Name = "Ảnh minh họa",
                    Description = "mô tả",
                    MediaUrl = "https://file4.batdongsan.com.vn/2024/01/04/20240104225053-5804_wm.jpg",
                    PostId = 11,
                    Deleted = false,
                },
                new Media
                {
                    Id = 43,
                    Name = "Ảnh minh họa",
                    Description = "mô tả",
                    MediaUrl = "https://file4.batdongsan.com.vn/2024/01/04/20240104225043-7442_wm.jpg",
                    PostId = 11,
                    Deleted = false,
                },
                new Media
                {
                    Id = 44,
                    Name = "Ảnh minh họa",
                    Description = "mô tả",
                    MediaUrl = "https://file4.batdongsan.com.vn/2024/01/04/20240104225052-16e9_wm.jpg",
                    PostId = 11,
                    Deleted = false,
                },
                new Media
                {
                    Id = 45,
                    Name = "Ảnh minh họa",
                    Description = "mô tả",
                    MediaUrl = "https://file4.batdongsan.com.vn/2024/01/17/20240117145923-d762_wm.jpeg",
                    PostId = 12,
                    Deleted = false,
                },
                new Media
                {
                    Id = 46,
                    Name = "Ảnh minh họa",
                    Description = "mô tả",
                    MediaUrl = "https://file4.batdongsan.com.vn/2024/01/17/20240117145930-87e8_wm.jpeg",
                    PostId = 12,
                    Deleted = false,
                },
                new Media
                {
                    Id = 47,
                    Name = "Ảnh minh họa",
                    Description = "mô tả",
                    MediaUrl = "https://file4.batdongsan.com.vn/2024/01/17/20240117145946-ae13_wm.jpeg",
                    PostId = 12,
                    Deleted = false,
                },
                new Media
                {
                    Id = 48,
                    Name = "Ảnh minh họa",
                    Description = "mô tả",
                    MediaUrl = "https://file4.batdongsan.com.vn/2024/01/17/20240117145954-9abc_wm.jpeg",
                    PostId = 12,
                    Deleted = false,
                },
                new Media
                {
                    Id = 49,
                    Name = "Ảnh minh họa",
                    Description = "mô tả",
                    MediaUrl = "https://file4.batdongsan.com.vn/2024/01/16/20240116132058-b577_wm.jpg",
                    PostId = 13,
                    Deleted = false,
                },
                new Media
                {
                    Id = 50,
                    Name = "Ảnh minh họa",
                    Description = "mô tả",
                    MediaUrl = "https://file4.batdongsan.com.vn/2024/01/16/20240116132122-29e0_wm.jpg",
                    PostId = 13,
                    Deleted = false,
                },
                new Media
                {
                    Id = 51,
                    Name = "Ảnh minh họa",
                    Description = "mô tả",
                    MediaUrl = "https://file4.batdongsan.com.vn/2024/01/16/20240116143224-532f_wm.jpg",
                    PostId = 13,
                    Deleted = false,
                },
                new Media
                {
                    Id = 52,
                    Name = "Ảnh minh họa",
                    Description = "mô tả",
                    MediaUrl = "https://file4.batdongsan.com.vn/2024/01/16/20240116143247-bed9_wm.jpg",
                    PostId = 13,
                    Deleted = false,
                },
                new Media
                {
                    Id = 53,
                    Name = "Ảnh minh họa",
                    Description = "mô tả",
                    MediaUrl = "https://file4.batdongsan.com.vn/2024/01/14/20240114095758-23a1_wm.jpg",
                    PostId = 14,
                    Deleted = false,
                },
                new Media
                {
                    Id = 54,
                    Name = "Ảnh minh họa",
                    Description = "mô tả",
                    MediaUrl = "https://file4.batdongsan.com.vn/2024/01/14/20240114095813-410d_wm.jpg",
                    PostId = 14,
                    Deleted = false,
                },
                new Media
                {
                    Id = 55,
                    Name = "Ảnh minh họa",
                    Description = "mô tả",
                    MediaUrl = "https://file4.batdongsan.com.vn/2024/01/14/20240114095845-73f5_wm.jpg",
                    PostId = 14,
                    Deleted = false,
                },
                new Media
                {
                    Id = 56,
                    Name = "Ảnh minh họa",
                    Description = "mô tả",
                    MediaUrl = "https://file4.batdongsan.com.vn/2024/01/14/20240114095904-3895_wm.jpg",
                    PostId = 14,
                    Deleted = false,
                },
                new Media
                {
                    Id = 57,
                    Name = "Ảnh minh họa",
                    Description = "mô tả",
                    MediaUrl = "https://file4.batdongsan.com.vn/2024/01/18/20240118101029-06ab_wm.jpg",
                    PostId = 15,
                    Deleted = false,
                },
                new Media
                {
                    Id = 58,
                    Name = "Ảnh minh họa",
                    Description = "mô tả",
                    MediaUrl = "https://file4.batdongsan.com.vn/2024/01/18/20240118101029-601b_wm.jpg",
                    PostId = 15,
                    Deleted = false,
                },
                new Media
                {
                    Id = 59,
                    Name = "Ảnh minh họa",
                    Description = "mô tả",
                    MediaUrl = "https://file4.batdongsan.com.vn/2024/01/18/20240118101029-e463_wm.jpg",
                    PostId = 15,
                    Deleted = false,
                },
                new Media
                {
                    Id = 60,
                    Name = "Ảnh minh họa",
                    Description = "mô tả",
                    MediaUrl = "https://file4.batdongsan.com.vn/2024/01/18/20240118101029-54d6_wm.jpg",
                    PostId = 15,
                    Deleted = false,
                },
                new Media
                {
                    Id = 61,
                    Name = "Ảnh minh họa",
                    Description = "mô tả",
                    MediaUrl = "https://file4.batdongsan.com.vn/2024/01/12/20240112133706-54ec_wm.jpg",
                    PostId = 16,
                    Deleted = false,
                },
                new Media
                {
                    Id = 62,
                    Name = "Ảnh minh họa",
                    Description = "mô tả",
                    MediaUrl = "https://file4.batdongsan.com.vn/2024/01/12/20240112133706-f688_wm.jpg",
                    PostId = 16,
                    Deleted = false,
                },
                new Media
                {
                    Id = 63,
                    Name = "Ảnh minh họa",
                    Description = "mô tả",
                    MediaUrl = "https://file4.batdongsan.com.vn/2024/01/12/20240112133706-a192_wm.jpg",
                    PostId = 16,
                    Deleted = false,
                },
                new Media
                {
                    Id = 64,
                    Name = "Ảnh minh họa",
                    Description = "mô tả",
                    MediaUrl = "https://file4.batdongsan.com.vn/2024/01/12/20240112133706-0f0c_wm.jpg",
                    PostId = 16,
                    Deleted = false,
                },
                new Media
                {
                    Id = 65,
                    Name = "Ảnh minh họa",
                    Description = "mô tả",
                    MediaUrl = "https://file4.batdongsan.com.vn/2023/05/02/20230502213853-a95b_wm.jpg",
                    PostId = 17,
                    Deleted = false,
                },
                new Media
                {
                    Id = 66,
                    Name = "Ảnh minh họa",
                    Description = "mô tả",
                    MediaUrl = "https://file4.batdongsan.com.vn/2023/05/02/20230502213856-3f43_wm.jpg",
                    PostId = 17,
                    Deleted = false,
                },
                new Media
                {
                    Id = 67,
                    Name = "Ảnh minh họa",
                    Description = "mô tả",
                    MediaUrl = "https://file4.batdongsan.com.vn/2024/01/04/20240104081738-41ce_wm.jpeg",
                    PostId = 17,
                    Deleted = false,
                },
                new Media
                {
                    Id = 68,
                    Name = "Ảnh minh họa",
                    Description = "mô tả",
                    MediaUrl = "https://file4.batdongsan.com.vn/2024/01/04/20240104081740-f52b_wm.jpeg",
                    PostId = 17,
                    Deleted = false,
                },
                new Media
                {
                    Id = 69,
                    Name = "Ảnh minh họa",
                    Description = "mô tả",
                    MediaUrl = "https://file4.batdongsan.com.vn/2023/10/31/20231031203448-0aea_wm.jpg",
                    PostId = 18,
                    Deleted = false,
                },
                new Media
                {
                    Id = 70,
                    Name = "Ảnh minh họa",
                    Description = "mô tả",
                    MediaUrl = "https://file4.batdongsan.com.vn/2023/10/31/20231031203451-6d39_wm.jpg",
                    PostId = 18,
                    Deleted = false,
                },
                new Media
                {
                    Id = 71,
                    Name = "Ảnh minh họa",
                    Description = "mô tả",
                    MediaUrl = "https://file4.batdongsan.com.vn/2023/10/31/20231031204502-a0eb_wm.jpg",
                    PostId = 18,
                    Deleted = false,
                },
                new Media
                {
                    Id = 72,
                    Name = "Ảnh minh họa",
                    Description = "mô tả",
                    MediaUrl = "https://file4.batdongsan.com.vn/2023/10/31/20231031204513-d3be_wm.jpg",
                    PostId = 18,
                    Deleted = false,
                },
                new Media
                {
                    Id = 73,
                    Name = "Ảnh minh họa",
                    Description = "mô tả",
                    MediaUrl = "https://file4.batdongsan.com.vn/2023/08/10/20230810214222-6494_wm.jpg",
                    PostId = 19,
                    Deleted = false,
                },
                new Media
                {
                    Id = 74,
                    Name = "Ảnh minh họa",
                    Description = "mô tả",
                    MediaUrl = "https://file4.batdongsan.com.vn/2023/08/10/20230810214232-0ff5_wm.jpg",
                    PostId = 19,
                    Deleted = false,
                },
                new Media
                {
                    Id = 75,
                    Name = "Ảnh minh họa",
                    Description = "mô tả",
                    MediaUrl = "https://file4.batdongsan.com.vn/2023/08/10/20230810214243-804b_wm.jpg",
                    PostId = 19,
                    Deleted = false,
                },
                new Media
                {
                    Id = 76,
                    Name = "Ảnh minh họa",
                    Description = "mô tả",
                    MediaUrl = "https://file4.batdongsan.com.vn/2023/08/10/20230810214257-dd5b_wm.jpg",
                    PostId = 19,
                    Deleted = false,
                },
                new Media
                {
                    Id = 77,
                    Name = "Ảnh minh họa",
                    Description = "mô tả",
                    MediaUrl = "https://file4.batdongsan.com.vn/2023/11/13/20231113142657-11a9_wm.jpg",
                    PostId = 20,
                    Deleted = false,
                },
                new Media
                {
                    Id = 78,
                    Name = "Ảnh minh họa",
                    Description = "mô tả",
                    MediaUrl = "https://file4.batdongsan.com.vn/2023/11/13/20231113142718-45c6_wm.jpg",
                    PostId = 20,
                    Deleted = false,
                },
                new Media
                {
                    Id = 79,
                    Name = "Ảnh minh họa",
                    Description = "mô tả",
                    MediaUrl = "https://file4.batdongsan.com.vn/2023/11/13/20231113142718-ddca_wm.jpg",
                    PostId = 20,
                    Deleted = false,
                },
                new Media
                {
                    Id = 80,
                    Name = "Ảnh minh họa",
                    Description = "mô tả",
                    MediaUrl = "https://file4.batdongsan.com.vn/2023/11/13/20231113142718-d5d3_wm.jpg",
                    PostId = 20,
                    Deleted = false,
                },
                new Media
                {
                    Id = 81,
                    Name = "Ảnh minh họa",
                    Description = "mô tả",
                    MediaUrl = "https://file4.batdongsan.com.vn/2022/10/07/20221007154150-6335_wm.jpg",
                    PostId = 21,
                    Deleted = false,
                },
                new Media
                {
                    Id = 82,
                    Name = "Ảnh minh họa",
                    Description = "mô tả",
                    MediaUrl = "https://file4.batdongsan.com.vn/2022/10/07/20221007154149-c884_wm.jpg",
                    PostId = 21,
                    Deleted = false,
                },
                new Media
                {
                    Id = 83,
                    Name = "Ảnh minh họa",
                    Description = "mô tả",
                    MediaUrl = "https://file4.batdongsan.com.vn/2022/10/07/20221007154150-81d7_wm.jpg",
                    PostId = 21,
                    Deleted = false,
                },
                new Media
                {
                    Id = 84,
                    Name = "Ảnh minh họa",
                    Description = "mô tả",
                    MediaUrl = "https://file4.batdongsan.com.vn/2022/10/07/20221007154150-634d_wm.jpg",
                    PostId = 21,
                    Deleted = false,
                },
                new Media
                {
                    Id = 85,
                    Name = "Ảnh minh họa",
                    Description = "mô tả",
                    MediaUrl = "https://file4.batdongsan.com.vn/2023/11/16/20231116202228-6c00_wm.jpg",
                    PostId = 22,
                    Deleted = false,
                },
                new Media
                {
                    Id = 86,
                    Name = "Ảnh minh họa",
                    Description = "mô tả",
                    MediaUrl = "https://file4.batdongsan.com.vn/2023/12/19/20231219110337-9204_wm.jpg",
                    PostId = 22,
                    Deleted = false,
                },
                new Media
                {
                    Id = 87,
                    Name = "Ảnh minh họa",
                    Description = "mô tả",
                    MediaUrl = "https://file4.batdongsan.com.vn/2023/12/15/20231215155922-8d7e_wm.jpg",
                    PostId = 22,
                    Deleted = false,
                },
                new Media
                {
                    Id = 88,
                    Name = "Ảnh minh họa",
                    Description = "mô tả",
                    MediaUrl = "https://file4.batdongsan.com.vn/2023/11/16/20231116202228-19c2_wm.jpg",
                    PostId = 22,
                    Deleted = false,
                },
                new Media
                {
                    Id = 89,
                    Name = "Ảnh minh họa",
                    Description = "mô tả",
                    MediaUrl = "https://file4.batdongsan.com.vn/2024/01/16/20240116223016-5391_wm.jpeg",
                    PostId = 23,
                    Deleted = false,
                },
                new Media
                {
                    Id = 90,
                    Name = "Ảnh minh họa",
                    Description = "mô tả",
                    MediaUrl = "https://file4.batdongsan.com.vn/2024/01/16/20240116222954-0f9a_wm.jpeg",
                    PostId = 23,
                    Deleted = false,
                },
                new Media
                {
                    Id = 91,
                    Name = "Ảnh minh họa",
                    Description = "mô tả",
                    MediaUrl = "https://file4.batdongsan.com.vn/2024/01/16/20240116222955-dfb5_wm.jpeg",
                    PostId = 23,
                    Deleted = false,
                },
                new Media
                {
                    Id = 92,
                    Name = "Ảnh minh họa",
                    Description = "mô tả",
                    MediaUrl = "https://file4.batdongsan.com.vn/2024/01/16/20240116222958-f594_wm.jpeg",
                    PostId = 23,
                    Deleted = false,
                },
                new Media
                {
                    Id = 93,
                    Name = "Ảnh minh họa",
                    Description = "mô tả",
                    MediaUrl = "https://file4.batdongsan.com.vn/2024/01/12/20240112160542-363a_wm.jpg",
                    PostId = 24,
                    Deleted = false,
                },
                new Media
                {
                    Id = 94,
                    Name = "Ảnh minh họa",
                    Description = "mô tả",
                    MediaUrl = "https://file4.batdongsan.com.vn/2024/01/12/20240112160542-4ed6_wm.jpg",
                    PostId = 24,
                    Deleted = false,
                },
                new Media
                {
                    Id = 95,
                    Name = "Ảnh minh họa",
                    Description = "mô tả",
                    MediaUrl = "https://file4.batdongsan.com.vn/2024/01/12/20240112160542-a157_wm.jpg",
                    PostId = 24,
                    Deleted = false,
                },
                new Media
                {
                    Id = 96,
                    Name = "Ảnh minh họa",
                    Description = "mô tả",
                    MediaUrl = "https://file4.batdongsan.com.vn/2024/01/17/20240117133737-e30b_wm.jpg",
                    PostId = 24,
                    Deleted = false,
                },
                new Media
                {
                    Id = 97,
                    Name = "Ảnh minh họa",
                    Description = "mô tả",
                    MediaUrl = "https://file4.batdongsan.com.vn/2024/01/17/20240117150309-4443_wm.jpg",
                    PostId = 25,
                    Deleted = false,
                },
                new Media
                {
                    Id = 98,
                    Name = "Ảnh minh họa",
                    Description = "mô tả",
                    MediaUrl = "https://file4.batdongsan.com.vn/2024/01/17/20240117150309-2f2e_wm.jpg",
                    PostId = 25,
                    Deleted = false,
                },
                new Media
                {
                    Id = 99,
                    Name = "Ảnh minh họa",
                    Description = "mô tả",
                    MediaUrl = "https://file4.batdongsan.com.vn/2024/01/17/20240117150313-4755_wm.jpg",
                    PostId = 25,
                    Deleted = false,
                },
                new Media
                {
                    Id = 100,
                    Name = "Ảnh minh họa",
                    Description = "mô tả",
                    MediaUrl = "https://file4.batdongsan.com.vn/2024/01/17/20240117150309-f118_wm.jpg",
                    PostId = 25,
                    Deleted = false,
                },
                new Media
                {
                    Id = 101,
                    Name = "Ảnh minh họa",
                    Description = "mô tả",
                    MediaUrl = "https://file4.batdongsan.com.vn/2023/12/21/20231221133052-1d91_wm.jpg",
                    PostId = 26,
                    Deleted = false,
                },
                new Media
                {
                    Id = 102,
                    Name = "Ảnh minh họa",
                    Description = "mô tả",
                    MediaUrl = "https://file4.batdongsan.com.vn/2023/12/21/20231221133053-bd57_wm.jpg",
                    PostId = 26,
                    Deleted = false,
                },
                new Media
                {
                    Id = 103,
                    Name = "Ảnh minh họa",
                    Description = "mô tả",
                    MediaUrl = "https://file4.batdongsan.com.vn/2023/12/21/20231221133053-f1f8_wm.jpg",
                    PostId = 26,
                    Deleted = false,
                },
                new Media
                {
                    Id = 104,
                    Name = "Ảnh minh họa",
                    Description = "mô tả",
                    MediaUrl = "https://file4.batdongsan.com.vn/2023/12/21/20231221133053-45a6_wm.jpg",
                    PostId = 26,
                    Deleted = false,
                },
                new Media
                {
                    Id = 105,
                    Name = "Ảnh minh họa",
                    Description = "mô tả",
                    MediaUrl = "https://file4.batdongsan.com.vn/2023/12/31/20231231121444-b9ee_wm.jpg",
                    PostId = 27,
                    Deleted = false,
                },
                new Media
                {
                    Id = 106,
                    Name = "Ảnh minh họa",
                    Description = "mô tả",
                    MediaUrl = "https://file4.batdongsan.com.vn/2023/12/31/20231231121452-6449_wm.jpg",
                    PostId = 27,
                    Deleted = false,
                },
                new Media
                {
                    Id = 107,
                    Name = "Ảnh minh họa",
                    Description = "mô tả",
                    MediaUrl = "https://file4.batdongsan.com.vn/2023/12/31/20231231121501-05e0_wm.jpg",
                    PostId = 27,
                    Deleted = false,
                },
                new Media
                {
                    Id = 108,
                    Name = "Ảnh minh họa",
                    Description = "mô tả",
                    MediaUrl = "https://file4.batdongsan.com.vn/2023/12/31/20231231121507-cb40_wm.jpg",
                    PostId = 27,
                    Deleted = false,
                },
                new Media
                {
                    Id = 109,
                    Name = "Ảnh minh họa",
                    Description = "mô tả",
                    MediaUrl = "https://file4.batdongsan.com.vn/2024/01/18/20240118075644-bdc4_wm.jpg",
                    PostId = 28,
                    Deleted = false,
                },
                new Media
                {
                    Id = 110,
                    Name = "Ảnh minh họa",
                    Description = "mô tả",
                    MediaUrl = "https://file4.batdongsan.com.vn/2024/01/17/20240117080637-3ee5_wm.jpg",
                    PostId = 28,
                    Deleted = false,
                },
                new Media
                {
                    Id = 111,
                    Name = "Ảnh minh họa",
                    Description = "mô tả",
                    MediaUrl = "https://file4.batdongsan.com.vn/2024/01/17/20240117080637-dc8e_wm.jpg",
                    PostId = 28,
                    Deleted = false,
                },
                new Media
                {
                    Id = 112,
                    Name = "Ảnh minh họa",
                    Description = "mô tả",
                    MediaUrl = "https://file4.batdongsan.com.vn/2024/01/17/20240117080637-fa91_wm.jpg",
                    PostId = 28,
                    Deleted = false,
                },
                new Media
                {
                    Id = 113,
                    Name = "Ảnh minh họa",
                    Description = "mô tả",
                    MediaUrl = "https://file4.batdongsan.com.vn/2024/01/17/20240117113215-a1c8_wm.jpg",
                    PostId = 29,
                    Deleted = false,
                },
                new Media
                {
                    Id = 114,
                    Name = "Ảnh minh họa",
                    Description = "mô tả",
                    MediaUrl = "https://file4.batdongsan.com.vn/2024/01/17/20240117113215-5c5f_wm.jpg",
                    PostId = 29,
                    Deleted = false,
                },
                new Media
                {
                    Id = 115,
                    Name = "Ảnh minh họa",
                    Description = "mô tả",
                    MediaUrl = "https://file4.batdongsan.com.vn/2024/01/17/20240117113215-ada9_wm.jpg",
                    PostId = 29,
                    Deleted = false,
                },
                new Media
                {
                    Id = 116,
                    Name = "Ảnh minh họa",
                    Description = "mô tả",
                    MediaUrl = "https://file4.batdongsan.com.vn/2024/01/17/20240117113215-1049_wm.jpg",
                    PostId = 29,
                    Deleted = false,
                },
                new Media
                {
                    Id = 117,
                    Name = "Ảnh minh họa",
                    Description = "mô tả",
                    MediaUrl = "https://file4.batdongsan.com.vn/2023/05/04/20230504113934-2f4a_wm.jpg",
                    PostId = 30,
                    Deleted = false,
                },
                new Media
                {
                    Id = 118,
                    Name = "Ảnh minh họa",
                    Description = "mô tả",
                    MediaUrl = "https://file4.batdongsan.com.vn/2023/06/24/20230624115549-ab24_wm.jpg",
                    PostId = 30,
                    Deleted = false,
                },
                new Media
                {
                    Id = 119,
                    Name = "Ảnh minh họa",
                    Description = "mô tả",
                    MediaUrl = "https://file4.batdongsan.com.vn/2023/05/04/20230504113944-69ad_wm.jpg",
                    PostId = 30,
                    Deleted = false,
                },
                new Media
                {
                    Id = 120,
                    Name = "Ảnh minh họa",
                    Description = "mô tả",
                    MediaUrl = "https://file4.batdongsan.com.vn/2023/12/25/20231225153300-3694_wm.jpg",
                    PostId = 30,
                    Deleted = false,
                },
                new Media
                {
                    Id = 121,
                    Name = "Ảnh minh họa",
                    Description = "mô tả",
                    MediaUrl = "https://file4.batdongsan.com.vn/2023/11/21/20231121142514-81f0_wm.jpg",
                    PostId = 31,
                    Deleted = false,
                },
                new Media
                {
                    Id = 122,
                    Name = "Ảnh minh họa",
                    Description = "mô tả",
                    MediaUrl = "https://file4.batdongsan.com.vn/2023/11/21/20231121144419-d5a2_wm.jpg",
                    PostId = 31,
                    Deleted = false,
                },
                new Media
                {
                    Id = 123,
                    Name = "Ảnh minh họa",
                    Description = "mô tả",
                    MediaUrl = "https://file4.batdongsan.com.vn/2023/11/21/20231121142514-3470_wm.jpg",
                    PostId = 31,
                    Deleted = false,
                },
                new Media
                {
                    Id = 124,
                    Name = "Ảnh minh họa",
                    Description = "mô tả",
                    MediaUrl = "https://file4.batdongsan.com.vn/2023/11/21/20231121142514-ae40_wm.jpg",
                    PostId = 31,
                    Deleted = false,
                },
                new Media
                {
                    Id = 125,
                    Name = "Ảnh minh họa",
                    Description = "mô tả",
                    MediaUrl = "https://file4.batdongsan.com.vn/2024/01/18/20240118153848-00b8_wm.jpg",
                    PostId = 32,
                    Deleted = false,
                },
                new Media
                {
                    Id = 126,
                    Name = "Ảnh minh họa",
                    Description = "mô tả",
                    MediaUrl = "https://file4.batdongsan.com.vn/2024/01/18/20240118153848-d164_wm.jpg",
                    PostId = 32,
                    Deleted = false,
                },
                new Media
                {
                    Id = 127,
                    Name = "Ảnh minh họa",
                    Description = "mô tả",
                    MediaUrl = "https://file4.batdongsan.com.vn/2024/01/18/20240118153848-48cb_wm.jpg",
                    PostId = 32,
                    Deleted = false,
                },
                new Media
                {
                    Id = 128,
                    Name = "Ảnh minh họa",
                    Description = "mô tả",
                    MediaUrl = "https://file4.batdongsan.com.vn/2024/01/18/20240118153848-20b7_wm.jpg",
                    PostId = 32,
                    Deleted = false,
                },
                new Media
                {
                    Id = 129,
                    Name = "Ảnh minh họa",
                    Description = "mô tả",
                    MediaUrl = "https://file4.batdongsan.com.vn/2024/01/15/20240115100807-43c9_wm.jpg",
                    PostId = 33,
                    Deleted = false,
                },
                new Media
                {
                    Id = 130,
                    Name = "Ảnh minh họa",
                    Description = "mô tả",
                    MediaUrl = "https://file4.batdongsan.com.vn/2024/01/15/20240115100808-3821_wm.jpg",
                    PostId = 33,
                    Deleted = false,
                },
                new Media
                {
                    Id = 131,
                    Name = "Ảnh minh họa",
                    Description = "mô tả",
                    MediaUrl = "https://file4.batdongsan.com.vn/2024/01/15/20240115100808-4cd8_wm.jpg",
                    PostId = 33,
                    Deleted = false,
                },
                new Media
                {
                    Id = 132,
                    Name = "Ảnh minh họa",
                    Description = "mô tả",
                    MediaUrl = "https://file4.batdongsan.com.vn/2024/01/15/20240115100811-174f_wm.jpg",
                    PostId = 33,
                    Deleted = false,
                },
                new Media
                {
                    Id = 133,
                    Name = "Ảnh minh họa",
                    Description = "mô tả",
                    MediaUrl = "https://file4.batdongsan.com.vn/2024/01/16/20240116142339-a38f_wm.jpg",
                    PostId = 34,
                    Deleted = false,
                },
                new Media
                {
                    Id = 134,
                    Name = "Ảnh minh họa",
                    Description = "mô tả",
                    MediaUrl = "https://file4.batdongsan.com.vn/2024/01/16/20240116140927-b014_wm.jpg",
                    PostId = 34,
                    Deleted = false,
                },
                new Media
                {
                    Id = 135,
                    Name = "Ảnh minh họa",
                    Description = "mô tả",
                    MediaUrl = "https://file4.batdongsan.com.vn/2024/01/16/20240116141029-18f9_wm.jpg",
                    PostId = 34,
                    Deleted = false,
                },
                new Media
                {
                    Id = 136,
                    Name = "Ảnh minh họa",
                    Description = "mô tả",
                    MediaUrl = "https://file4.batdongsan.com.vn/2024/01/16/20240116140453-bd95_wm.jpg",
                    PostId = 34,
                    Deleted = false,
                },
                new Media
                {
                    Id = 137,
                    Name = "Ảnh minh họa",
                    Description = "mô tả",
                    MediaUrl = "https://file4.batdongsan.com.vn/2024/01/15/20240115100807-43c9_wm.jpg",
                    PostId = 35,
                    Deleted = false,
                },
                new Media
                {
                    Id = 138,
                    Name = "Ảnh minh họa",
                    Description = "mô tả",
                    MediaUrl = "https://file4.batdongsan.com.vn/2024/01/15/20240115100808-3821_wm.jpg",
                    PostId = 35,
                    Deleted = false,
                },
                new Media
                {
                    Id = 139,
                    Name = "Ảnh minh họa",
                    Description = "mô tả",
                    MediaUrl = "https://file4.batdongsan.com.vn/2024/01/15/20240115100808-4cd8_wm.jpg",
                    PostId = 35,
                    Deleted = false,
                },
                new Media
                {
                    Id = 140,
                    Name = "Ảnh minh họa",
                    Description = "mô tả",
                    MediaUrl = "https://file4.batdongsan.com.vn/2024/01/15/20240115100811-174f_wm.jpg",
                    PostId = 35,
                    Deleted = false,
                },
                new Media
                {
                    Id = 141,
                    Name = "Ảnh minh họa",
                    Description = "mô tả",
                    MediaUrl = "https://file4.batdongsan.com.vn/2023/09/19/20230919115319-5c33_wm.jpg",
                    PostId = 36,
                    Deleted = false,
                },
                new Media
                {
                    Id = 142,
                    Name = "Ảnh minh họa",
                    Description = "mô tả",
                    MediaUrl = "https://file4.batdongsan.com.vn/2023/09/19/20230919115319-fe90_wm.jpg",
                    PostId = 36,
                    Deleted = false,
                },
                new Media
                {
                    Id = 143,
                    Name = "Ảnh minh họa",
                    Description = "mô tả",
                    MediaUrl = "https://file4.batdongsan.com.vn/2023/09/19/20230919115319-b3de_wm.jpg",
                    PostId = 36,
                    Deleted = false,
                },
                new Media
                {
                    Id = 144,
                    Name = "Ảnh minh họa",
                    Description = "mô tả",
                    MediaUrl = "https://file4.batdongsan.com.vn/2023/09/19/20230919115320-eaf4_wm.jpg",
                    PostId = 36,
                    Deleted = false,
                },
                new Media
                {
                    Id = 145,
                    Name = "Ảnh minh họa",
                    Description = "mô tả",
                    MediaUrl = "https://file4.batdongsan.com.vn/2022/11/20/20221120214322-3a56_wm.jpg",
                    PostId = 37,
                    Deleted = false,
                },
                new Media
                {
                    Id = 146,
                    Name = "Ảnh minh họa",
                    Description = "mô tả",
                    MediaUrl = "https://file4.batdongsan.com.vn/2022/11/20/20221120214306-de48_wm.jpg",
                    PostId = 37,
                    Deleted = false,
                },
                new Media
                {
                    Id = 147,
                    Name = "Ảnh minh họa",
                    Description = "mô tả",
                    MediaUrl = "https://file4.batdongsan.com.vn/2022/11/20/20221120214333-840e_wm.jpg",
                    PostId = 37,
                    Deleted = false,
                },
                new Media
                {
                    Id = 148,
                    Name = "Ảnh minh họa",
                    Description = "mô tả",
                    MediaUrl = "https://file4.batdongsan.com.vn/2022/11/20/20221120214356-be44_wm.jpg",
                    PostId = 37,
                    Deleted = false,
                },
                new Media
                {
                    Id = 149,
                    Name = "Ảnh minh họa",
                    Description = "mô tả",
                    MediaUrl = "https://file4.batdongsan.com.vn/2022/11/03/20221103154832-01dd_wm.jpg",
                    PostId = 38,
                    Deleted = false,
                },
                new Media
                {
                    Id = 150,
                    Name = "Ảnh minh họa",
                    Description = "mô tả",
                    MediaUrl = "https://file4.batdongsan.com.vn/2022/11/03/20221103154832-b126_wm.jpg",
                    PostId = 38,
                    Deleted = false,
                },
                new Media
                {
                    Id = 151,
                    Name = "Ảnh minh họa",
                    Description = "mô tả",
                    MediaUrl = "https://file4.batdongsan.com.vn/2022/11/03/20221103154832-2968_wm.jpg",
                    PostId = 38,
                    Deleted = false,
                },
                new Media
                {
                    Id = 152,
                    Name = "Ảnh minh họa",
                    Description = "mô tả",
                    MediaUrl = "https://file4.batdongsan.com.vn/2023/06/02/20230602185335-3550_wm.jpg",
                    PostId = 38,
                    Deleted = false,
                },
                new Media
                {
                    Id = 153,
                    Name = "Ảnh minh họa",
                    Description = "mô tả",
                    MediaUrl = "https://file4.batdongsan.com.vn/2023/12/27/20231227135850-8f73_wm.jpg",
                    PostId = 39,
                    Deleted = false,
                },
                new Media
                {
                    Id = 154,
                    Name = "Ảnh minh họa",
                    Description = "mô tả",
                    MediaUrl = "https://file4.batdongsan.com.vn/2023/12/27/20231227135850-d881_wm.jpg",
                    PostId = 39,
                    Deleted = false,
                },
                new Media
                {
                    Id = 155,
                    Name = "Ảnh minh họa",
                    Description = "mô tả",
                    MediaUrl = "https://file4.batdongsan.com.vn/2023/12/27/20231227135850-5d6f_wm.jpg",
                    PostId = 39,
                    Deleted = false,
                },
                new Media
                {
                    Id = 156,
                    Name = "Ảnh minh họa",
                    Description = "mô tả",
                    MediaUrl = "https://file4.batdongsan.com.vn/2023/12/27/20231227135850-5915_wm.jpg",
                    PostId = 39,
                    Deleted = false,
                },
                new Media
                {
                    Id = 157,
                    Name = "Ảnh minh họa",
                    Description = "mô tả",
                    MediaUrl = "https://file4.batdongsan.com.vn/2023/11/09/20231109082801-efc3_wm.jpg",
                    PostId = 40,
                    Deleted = false,
                },
                new Media
                {
                    Id = 158,
                    Name = "Ảnh minh họa",
                    Description = "mô tả",
                    MediaUrl = "https://file4.batdongsan.com.vn/2023/11/09/20231109082805-3d9d_wm.jpg",
                    PostId = 40,
                    Deleted = false,
                },
                new Media
                {
                    Id = 159,
                    Name = "Ảnh minh họa",
                    Description = "mô tả",
                    MediaUrl = "https://file4.batdongsan.com.vn/2023/11/09/20231109082808-d400_wm.jpg",
                    PostId = 40,
                    Deleted = false,
                },
                new Media
                {
                    Id = 160,
                    Name = "Ảnh minh họa",
                    Description = "mô tả",
                    MediaUrl = "https://file4.batdongsan.com.vn/2023/11/09/20231109082811-912e_wm.jpg",
                    PostId = 40,
                    Deleted = false,
                });
            #endregion

        }
    }
}
