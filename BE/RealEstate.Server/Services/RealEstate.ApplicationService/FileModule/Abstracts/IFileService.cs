using RealEstate.ApplicationService.FileModule.Dtos.UploadFile;

namespace RealEstate.ApplicationService.FileModule.Abstracts
{
    public interface IFileService
    {
        byte[] GetFile(string folder, string fileName);
        string UploadFile(UploadFileModel input);
    }
}
