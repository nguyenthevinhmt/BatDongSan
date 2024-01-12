using EntitiesBase.Interfaces;
using Microsoft.EntityFrameworkCore;
using RealEstate.Utils.ConstantVariables.Database;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace RealEstate.Domain.Entities
{
    [Table(nameof(RealEstateType), Schema = DbSchemas.Default)]
    [Index(nameof(Deleted), Name = $"IX_{nameof(RealEstateType)}")]
    public class RealEstateType : IFullAudited
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; } = null!;
        #region audit
        public DateTime? CreatedDate { get; set; }
        public int? CreatedBy { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public int? ModifiedBy { get; set; }
        public bool Deleted { get; set; }
        public List<Post> Posts { get; set; } = new();
        #endregion
    }
}
