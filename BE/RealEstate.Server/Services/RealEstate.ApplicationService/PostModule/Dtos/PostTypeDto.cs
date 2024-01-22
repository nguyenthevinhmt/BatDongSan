namespace RealEstate.ApplicationService.PostModule.Dtos
{
    public class PostTypeDto
    {
        public int Id { get; set; }
        /// <summary>
        /// Tên
        /// </summary>
        public string Name { get; set; } = null!;
        public DateTime? CreateAt { get; set; }
        public int? ModifierBy { get; set; }
        public DateTime? ModifiedAt { get; set; }
    }
}
