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
                    Password = PasswordHasher.HashPassword("123qwe"),
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
                    Password = PasswordHasher.HashPassword("123qwe"),
                    Fullname = "customer",
                    UserType = UserTypes.CUSTOMER,
                    Status = UserStatus.ACTIVE,
                    PhoneNumber = "0972808703",
                    Username = "customer",
                });
            #endregion
        }
    }
}
