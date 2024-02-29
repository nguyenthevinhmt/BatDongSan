using Microsoft.EntityFrameworkCore;
using RealEstate.Utils.ConstantVariables.Database;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace RealEstate.Domain.Entities
{
    [Table(nameof(Wallet), Schema = DbSchemas.Default)]
    [Index(nameof(UserId), Name = $"IX_{nameof(Wallet)}")]
    public class Wallet
    {
        [Key]
        public int Id { get; set; }
        /// <summary>
        /// Mã số ví
        /// </summary>
        public string WalletNumber { get; set; } = null!;
        /// <summary>
        /// Số dư
        /// </summary>
        [Range(0, double.MaxValue)]
        public double Balance { get; set; }
        public int UserId { get; set; }
        public User? User { get; set; }
        public List<Transaction>? Transactions { get; set; }
    }
}
