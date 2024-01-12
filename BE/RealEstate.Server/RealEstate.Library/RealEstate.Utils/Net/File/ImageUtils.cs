using Microsoft.AspNetCore.Http;
using SixLabors.ImageSharp;
using SixLabors.ImageSharp.Formats.Jpeg;
using SixLabors.ImageSharp.Processing;

namespace RealEstate.Utils.Net.File
{
    /// <summary>
    /// Các hàm tiện ích cho ảnh
    /// </summary>
    public class ImageUtils
    {
        /// <summary>
        /// Độ rộng tối đa của ảnh
        /// </summary>
        public const int MAX_WIDTH = 1920;

        /// <summary>
        /// Resize ảnh và lưu theo đường dẫn
        /// </summary>
        /// <param name="file"></param>
        /// <param name="resultPath">Đường dẫn lưu</param>
        public static void ResizeImage(IFormFile file, string resultPath)
        {
            using var ms = new MemoryStream();
            file.CopyTo(ms);
            ms.Position = 0;
            var image = Image.Load(ms);
            int originalWidth = Math.Max(image.Width, image.Height);

            var jpegEncoder = new JpegEncoder { Quality = 75 }; // Điều chỉnh mức độ nén nếu là ảnh jpeg
            if (originalWidth <= MAX_WIDTH)
            {
                //image.Save(resultPath, jpegEncoder);
                image.SaveAsWebp(resultPath);
                return;
            }
            double resizeRatio = (double)MAX_WIDTH / originalWidth;
            image.Mutate(x => x.Resize((int)(image.Width * resizeRatio), (int)(image.Height * resizeRatio)));
            //image.Save(resultPath, jpegEncoder);
            image.SaveAsWebp(resultPath);
        }

        /// <summary>
        /// Resize ảnh trực tiếp và trả về mảng bytes
        /// </summary>
        /// <param name="sourceByte"></param>
        /// <returns></returns>
        public static byte[] ResizeImage(byte[] sourceByte)
        {
            var image = Image.Load(sourceByte);
            int originalWidth = Math.Max(image.Width, image.Height);
            var jpegEncoder = new JpegEncoder { Quality = 75 }; // Điều chỉnh mức độ nén nếu là ảnh jpeg
            if (originalWidth <= MAX_WIDTH)
            {
                return sourceByte;
            }
            double resizeRatio = (double)MAX_WIDTH / originalWidth;
            image.Mutate(x => x.Resize((int)(image.Width * resizeRatio), (int)(image.Height * resizeRatio)));

            var memoryStream = new MemoryStream();
            image.Save(memoryStream, jpegEncoder);
            return memoryStream.ToArray();
        }

        /// <summary>
        /// Thử resize ảnh, thành công lưu file và trả về true, thất bại trả về false
        /// </summary>
        /// <param name="file"></param>
        /// <param name="resultPath">Đường dẫn lưu</param>
        /// <returns></returns>
        public static bool TryResizeImage(IFormFile file, string resultPath)
        {
            try
            {
                ResizeImage(file, resultPath);
                return true;
            }
            catch
            {
                return false;
            }
        }
    }
}
