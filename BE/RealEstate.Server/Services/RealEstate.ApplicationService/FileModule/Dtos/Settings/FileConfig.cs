namespace RealEstate.ApplicationService.FileModule.Dtos.Settings
{
    public class FileConfig
    {
        public string Path { get; set; } = null!;
        public double LimitUpload { get; set; }
        public string AllowExtension { get; set; } = null!;
    }
}
