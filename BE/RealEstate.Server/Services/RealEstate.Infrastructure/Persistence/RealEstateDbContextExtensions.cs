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
        }
    }
}
