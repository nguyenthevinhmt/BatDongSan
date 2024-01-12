using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using RealEstate.ApplicationService.FileModule.Abstracts;
using RealEstate.ApplicationService.FileModule.Dtos.Settings;
using RealEstate.ApplicationService.FileModule.Dtos.UploadFile;
using RealEstate.Utils.ConstantVariables.Shared;
using RealEstate.Utils.CustomException;
using RealEstate.Utils.Net.File;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.InteropServices;
using System.Text;
using System.Threading.Tasks;
using System.Web;

namespace RealEstate.ApplicationService.FileModule.Implements
{
    public class FileService : IFileService
    {
        private readonly IHostingEnvironment _hostEnvironment;
        private readonly FileConfig _fileConfig;
        private readonly ILogger<FileService> _logger;

        public FileService(ILogger<FileService> logger,
            IHttpContextAccessor httpContext,
            IHostingEnvironment hostEnvironment,
            IOptions<FileConfig> fileConfig)
        {
            _hostEnvironment = hostEnvironment;
            _fileConfig = fileConfig.Value;
            _logger = logger;
        }

        public byte[] GetFile(string folder, string fileName)
        {
            var fileByte = GetFile(folder, fileName, _fileConfig);
            return fileByte ?? throw new UserFriendlyException(ErrorCode.FileNotFound);
        }

        /// <summary>
        /// Đọc file ra dạng byte
        /// </summary>
        /// <param name="folder"></param>
        /// <param name="fileName"></param>
        /// <param name="config"></param>
        /// <returns></returns>
        /// <exception cref="UserFriendlyException"></exception>
        private byte[] GetFile(string folder, string fileName, FileConfig config)
        {
            string filePath = GetFilePath(folder, fileName, config);
            if (!File.Exists(filePath))
            {
                throw new UserFriendlyException(ErrorCode.FileNotFound);
            }

            var fileByte = File.ReadAllBytes(filePath);

            bool isImage = FileTypes.CommonImageExtensions.Contains(Path.GetExtension(fileName));
            if (isImage)
            {
                try
                {
                    fileByte = ImageUtils.ResizeImage(fileByte);
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "Lỗi resize ảnh");
                }
            }
            return fileByte;
        }

        /// <summary>
        /// Lấy full đường dẫn vật lý
        /// </summary>
        /// <param name="folder"></param>
        /// <param name="fileName"></param>
        /// <param name="config"></param>
        /// <returns></returns>
        private string GetFilePath(string folder, string fileName, FileConfig config)
        {
            var baseDir = "";

            if (RuntimeInformation.IsOSPlatform(OSPlatform.Windows))
            {
                baseDir = Directory.GetParent(Directory.GetParent(_hostEnvironment.ContentRootPath)!.FullName)!.FullName;
            }
            else if (RuntimeInformation.IsOSPlatform(OSPlatform.Linux))
            {
                baseDir = _hostEnvironment.ContentRootPath;
            }

            string filePath = Path.Combine(baseDir, config.Path ?? "", folder ?? "", fileName);

            return filePath;
        }

        private string UploadFile(IFormFile file, FileConfig config, string folderPath)
        {
            if (file == null)
            {
                _logger.LogError($"File được upload không có nội dung: FileName = {file!.FileName}; FileConfig = {config.LimitUpload}; folderPath = {folderPath} ");
                throw new UserFriendlyException(ErrorCode.FileNotFound);
            }

            if (file.Length > config.LimitUpload)
            {
                _logger.LogError($"Kích thước file không được vượt quá {config.LimitUpload / (1024 * 1024)} MB: FileName = {file.FileName}; FileConfig = {config.LimitUpload}; folderPath = {folderPath} ");
                throw new UserFriendlyException(ErrorCode.FileMaxLength, (config.LimitUpload / (1024 * 1024)).ToString());
            }

            var fileExtension = Path.GetExtension(file.FileName);
            var allowExtensions = config.AllowExtension.Split(",");

            if (!allowExtensions.Contains(fileExtension?.ToLower()))
            {
                _logger.LogError($"Định dạng file không hợp lệ: FileName = {file.FileName}; FileConfig = {config.LimitUpload}; folderPath = {folderPath} ");
                throw new UserFriendlyException(ErrorCode.FileExtention, config.AllowExtension.ToString());
            }
            string filePath = "";
            string prefixFilePath = "";

            if (RuntimeInformation.IsOSPlatform(OSPlatform.Windows))
            {
                var baseDir = Directory.GetParent(Directory.GetParent(_hostEnvironment.ContentRootPath)!.FullName)!.FullName;
                prefixFilePath = Path.Combine(baseDir, config.Path, folderPath ?? "");
            }
            else if (RuntimeInformation.IsOSPlatform(OSPlatform.Linux))
            {
                prefixFilePath = Path.Combine(_hostEnvironment.ContentRootPath, config.Path, folderPath ?? "");
            }

            Directory.CreateDirectory(prefixFilePath);
            filePath = Path.Combine(prefixFilePath, file.FileName);
            string fileName = "";
            //kiểm tra nếu là ảnh thì resize
            bool isImage = FileTypes.CommonImageExtensions.Contains(fileExtension);
            bool tryResize = false;
            if (isImage)
            {
                try
                {
                    //tạo đường dẫn lưu ảnh dạng webp
                    ImageUtils.ResizeImage(file, Path.ChangeExtension(filePath, FileTypes.WEBP));
                    tryResize = true;
                    //nếu nén thành công thì chuyển extension ảnh thành webp
                    fileName = Path.ChangeExtension(file.FileName, FileTypes.WEBP);
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "Lỗi resize ảnh");
                    tryResize = false;
                }
            }

            //không phải là ảnh hoặc là ảnh nhưng resize lỗi
            if (!isImage || (!tryResize && isImage))
            {
                using var filestream = new FileStream(filePath, FileMode.Create, FileAccess.Write, FileShare.None);
                file.CopyTo(filestream);
            }
            return fileName;
        }

        public string UploadFile(UploadFileModel input)
        {
            _logger.LogInformation("Upload file");
            string fileName = UploadFile(input.File!, _fileConfig, input.Folder!);
            string endpoint = GetEndPoint("file/get", input.Folder!, fileName);
            return endpoint ?? throw new UserFriendlyException(ErrorCode.FileNotFound);
        }

        private string GetEndPoint(string endpoint, string folder, string fileName)
        {
            fileName = HttpUtility.UrlEncode(fileName);
            folder = HttpUtility.UrlEncode(folder);
            return $"api/{endpoint}?folder={folder}&file={fileName}";
        }
    }
}
