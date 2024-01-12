using EntitiesBase.Base;
using EntitiesBase.Interfaces;

namespace EntitiesBase.Entities
{
    public interface IUser : IEntity<int>, IFullAudited
    {
        public string Username { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        public string? Phone { get; set; }
        public int Status { get; set; }
    }
}
