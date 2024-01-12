using Microsoft.EntityFrameworkCore;
using RealEstate.Utils.ConstantVariables.Database;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace RealEstate.Domain.Entities
{
    [Table(nameof(UserIdentification), Schema = DbSchemas.Default)]
    [Index(nameof(Deleted), Name = $"IX_{nameof(Post)}")]
    public class UserIdentification
    {
        [Key]
        public int Id { get; set; }
        [MaxLength(100)]
        public string IdNo { get; set; } = null!;
        [MaxLength(100)]
        public string Fullname { get; set; } = null!;
        public DateTime DateOfBirth { get; set; }
        [MaxLength(100)]
        public string Sex { get; set; } = null!;
        [MaxLength(100)]
        public string Nationality { get; set; } = null!;
        [MaxLength(250)]
        public string PlaceOfOrigin { get; set; } = null!;
        [MaxLength(250)]
        public string PlaceOfResidence { get; set; } = null!;
        public DateTime ExpiredDate { get; set; }
        public int UserId { get; set; }
        public User User { get; set; } = new();
        public DateTime CreateDate { get; set; }
        public int CreateBy { get; set; }
        public bool Deleted { get; set; }
    }
}
