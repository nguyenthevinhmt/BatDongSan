using EntitiesBase.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using RealEstate.Utils.ConstantVariables.Database;

namespace RealEstate.Domain.Entities
{
    [Table(nameof(Favorite), Schema = DbSchemas.Default)]
    [Index(nameof(Deleted), Name = $"IX_{nameof(Favorite)}")]
    public class Favorite : IFullAudited
    {
        [Key]
        public int Id { get; set; }
        public int PostId { get; set; }
        public Post Post { get; set; } = new();
        public int? UserId { get; set; }
        public User? User { get; set; }
        #region audit
        public DateTime? CreatedDate { get; set; }
        public int? CreatedBy { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public int? ModifiedBy { get; set; }
        public bool Deleted { get; set; }
        #endregion
    }
}
