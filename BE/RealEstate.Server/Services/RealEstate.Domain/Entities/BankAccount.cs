using EntitiesBase.Interfaces;
using Microsoft.EntityFrameworkCore;
using RealEstate.Domain.Entities;
using RealEstate.Utils.ConstantVariables.Database;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Xml.Linq;

namespace RealEstate.Domain.Entities
{
    [Table(nameof(BankAccount), Schema = DbSchemas.Default)]
    [Index(nameof(UserId), Name = $"IX_{nameof(BankAccount)}")]
    public class BankAccount : IFullAudited
    {
        [Key]
        public int Id { get; set; }
        /// <summary>
        /// Tên ngân hàng viết tắt
        /// </summary>
        [MaxLength(50)]
        public string BankName { get; set; } = null!;
        /// <summary>
        /// Số tài khoản
        /// </summary>
        [MaxLength(20)]
        public string BankCode { get; set; } = null!;
        /// <summary>
        /// Họ tên chủ tài khoản
        /// </summary>
        [MaxLength(50)]
        public string OwnerBankFullname { get; set; } = null!;
        /// <summary>
        /// Ngày phát hành thẻ
        /// </summary>
        public DateTime ReleaseDate { get; set; }
        public int UserId {  get; set; }
        public User? User {  get; set; }
        #region IFullAudit
        public DateTime? CreatedDate { get; set; }
        public int? CreatedBy { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public int? ModifiedBy { get; set; }
        public bool Deleted { get; set; }
        #endregion
    }
}
