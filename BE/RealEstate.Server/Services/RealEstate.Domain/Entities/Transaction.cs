using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace RealEstate.Domain.Entities
{
    [Table(nameof(Transaction), Schema = "dbo")]
    [Index(nameof(WalletID), Name = $"IX_{nameof(Transaction)}")]
    public class Transaction
    {
        [Key]
        public int Id { get; set; }
        /// <summary>
        /// Mã giao dịch
        /// </summary>
        public string TransactionNumber { get; set; } = null!;
        /// <summary>
        /// Mã số ví
        /// </summary>
        public int WalletID { get; set; }
        public Wallet Wallet { get; set; } = new();
        /// <summary>
        /// Số tiền giao dịch
        /// </summary>
        public double Amount { get; set; }
        /// <summary>
        /// Loại giao dịch
        /// </summary>
        public int TransactionType { get; set; }
        /// <summary>
        /// Chuyển từ 
        /// </summary>
        public string TransactionFrom { get; set; } = null!;
        /// <summary>
        /// Chuyển đến
        /// </summary>
        public string TransactionTo { get; set; } = null!;
        /// <summary>
        /// Mô tả giao dịch
        /// </summary>
        public string? Description { get; set; }
        /// <summary>
        /// Ngày tạo giao dịch
        /// </summary>
        public DateTime CreateDate { get; set; }
    }
}
