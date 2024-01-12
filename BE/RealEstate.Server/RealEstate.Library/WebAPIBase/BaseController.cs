using Microsoft.Extensions.Logging;
using RealEstate.Utils.Net.MimeTypes;
using Microsoft.AspNetCore.Mvc;

namespace WebAPIBase
{
    /// <summary>
    /// Base controller, xử lý ngoại lệ
    /// </summary>
    public class BaseController : ControllerBase
    {
        protected ILogger? _logger;

        [NonAction]
        protected FileContentResult FileByFormat(byte[] fileByte, string fileName)
        {
            string ext = Path.GetExtension(fileName)!.ToLower();

            return ext switch
            {
                ".jpg" or ".jpeg" or ".jfif" => File(fileByte, MimeTypeNames.ImageJpeg),
                ".png" => File(fileByte, MimeTypeNames.ImagePng),
                ".svg" => File(fileByte, MimeTypeNames.ImageSvgXml),
                ".gif" => File(fileByte, MimeTypeNames.ImageGif),
                ".mp4" => File(fileByte, MimeTypeNames.VideoMp4),
                //".pdf" => File(fileByte, MimeTypeNames.ApplicationPdf);
                _ => File(fileByte, MimeTypeNames.ApplicationOctetStream, fileName),
            };
        }
    }
}
