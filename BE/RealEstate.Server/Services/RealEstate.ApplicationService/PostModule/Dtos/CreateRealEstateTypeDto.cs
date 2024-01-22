namespace RealEstate.ApplicationService.PostModule.Dtos
{
    public class CreateRealEstateTypeDto
    {
        public string Name { get; set; } = null!;
    }
    public class UpdateRealEstateTypeDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!;
    }
}
