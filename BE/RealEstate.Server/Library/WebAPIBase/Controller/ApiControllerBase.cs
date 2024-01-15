using Microsoft.AspNetCore.Mvc;
using RealEstate.Utils.Net.MimeTypes;

namespace WebAPIBase.Controller
{
    public class ApiControllerBase : ControllerBase
    {
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
                ".webp" => File(fileByte, MimeTypeNames.ImageWebp),
                _ => File(fileByte, MimeTypeNames.ApplicationOctetStream, fileName),
            };
        }
    }
}
