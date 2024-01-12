using EntitiesBase.Interfaces;
using Microsoft.EntityFrameworkCore;
using RealEstate.Utils.ConstantVariables.Database;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Runtime.CompilerServices;

namespace RealEstate.Domain.Entities
{
    [Table(nameof(PostType), Schema = DbSchemas.Default)]
    [Index(nameof(Deleted), Name = $"IX_{nameof(PostType)}")]
    public class PostType : IFullAudited
    {
        [Key]
        public int Id { get; set; }
        [MaxLength(100)]
        public string Name { get; set; } = null!;
        public List<Post> Posts { get; set; } = new();
        #region audit
        public DateTime? CreatedDate { get; set; }
        public int? CreatedBy { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public int? ModifiedBy { get; set; }
        public bool Deleted { get; set; }
        #endregion
    }
}
