using Microsoft.AspNetCore.Http;

namespace RealEstate.ApplicationService.FileModule.Dtos.UploadFile
{
    public class UploadFileModel
    {
        public IFormFile? File { get; set; }
        public string? Folder { get; set; }
    }
}
