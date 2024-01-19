using DocumentFormat.OpenXml.Drawing;
using MailKit.Net.Smtp;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Org.BouncyCastle.Pkcs;
using Org.BouncyCastle.Security;
using RealEstate.Utils.ConstantVariables.Shared;
using RealEstate.Utils.CustomException;
using RealEstate.Utils.Localization;
using RealEstate.Utils;
using RealEstate.Utils.Net.MimeTypes;
using Microsoft.Extensions.Logging;
using System.Text.Json;

namespace WebAPIBase.Controller
{
    public class ApiControllerBase : ControllerBase
    {
        [NonAction]
        protected FileContentResult FileByFormat(byte[] fileByte, string fileName)
        {
            string ext = System.IO.Path.GetExtension(fileName)!.ToLower();

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
