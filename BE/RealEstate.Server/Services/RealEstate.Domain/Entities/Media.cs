using EntitiesBase.Interfaces;
using Microsoft.EntityFrameworkCore;
using RealEstate.Utils.ConstantVariables.Database;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace RealEstate.Domain.Entities
{
    [Table(nameof(Media), Schema = DbSchemas.Default)]
    [Index(nameof(Deleted), nameof(PostId), Name = $"IX_{nameof(Media)}")]
    public class Media : IFullAudited
    {
        [Key]
        public int Id { get; set; }
        [MaxLength(50)]
        public string Name { get; set; } = null!;
        [MaxLength(512)]
        public string Description { get; set; } = null!;
        [MaxLength(2048)]
        public string MediaUrl { get; set; } = null!;
        public int PostId { get; set; }
        public Post Post { get; } = null!;
        #region audit
        public DateTime? CreatedDate { get; set; }
        public int? CreatedBy { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public int? ModifiedBy { get; set; }
        public bool Deleted { get; set; }
        #endregion
    }
}
