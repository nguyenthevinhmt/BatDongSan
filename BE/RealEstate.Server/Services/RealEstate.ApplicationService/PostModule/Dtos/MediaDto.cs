namespace RealEstate.ApplicationService.PostModule.Dtos
{
    public class MediaDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public string Description { get; set; } = null!;
        public string MediaUrl { get; set; } = null!;
    }
}
