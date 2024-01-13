using EntitiesBase.Entities;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace RealEstate.Domain.Entities
{
    [Table(nameof(User), Schema = "dbo")]
    [Index(nameof(Email), nameof(Status), nameof(UserType), Name = $"IX_{nameof(User)}")]
    public class User : IUser
    {
        [Key]
        public int Id { get; set; }
        [MaxLength(50)]
        public string Fullname { get; set; } = null!;
        [MaxLength(50)]
        public string Email { get; set; } = null!;
        [MaxLength(50)]
        public string Username { get; set; } = null!;
        [MaxLength(512)]
        public string Password { get; set; } = null!;
        [MaxLength(12)]
        public string PhoneNumber { get; set; } = null!;
        [MaxLength(512)]
        public string? RefreshToken { get; set; }
        public DateTime? RefreshTokenExpiryTime { get; set; }
        /// <summary>
        /// Đường dẫn link ảnh
        /// </summary>
        [MaxLength(512)]
        public string? AvatarUrl { get; set; }
        public int UserType { get; set; }
        public bool IsConfirm { get; set; }
        /// <summary>
        /// Trạng thái tài khoản user
        /// <see cref="UserStatus"/>
        /// </summary>
        public int Status { get; set; }
        /// <summary>
        /// Mã OTP
        /// </summary>
        public string? Otp { get; set; }
        [MaxLength(128)]
        [Unicode(false)]
        public string? Phone { get; set; }
        public List<Wallet> Wallets { get; } = new();
        public List<Favorite> Favorites { get; } = new();
        public List<Post> Posts { get; } = new();
        public List<UserIdentification> UserIdentifications { get; } = new();
        public DateTime? CreatedDate { get; set; }
        public int? CreatedBy { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public int? ModifiedBy { get; set; }
        public bool Deleted { get; set; }
    }
}
