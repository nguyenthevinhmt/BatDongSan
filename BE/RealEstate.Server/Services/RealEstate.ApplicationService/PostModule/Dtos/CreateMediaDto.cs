using System.ComponentModel.DataAnnotations;

namespace RealEstate.ApplicationService.PostModule.Dtos
{
    public class CreateMediaDto
    {
        public string Name { get; set; } = null!;
        public string Description { get; set; } = null!;
        public string MediaUrl { get; set; } = null!;
    }
}
