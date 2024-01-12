using Microsoft.AspNetCore.Http;
using RealEstate.Utils.ConstantVariables.Shared;
using System.Reflection;

namespace RealEstate.ApplicationBase.Localization
{
    public class MapErrorCodeBase
    {
        protected const string PrefixError = "error_";
        public readonly Dictionary<ErrorCode, string> Map = new();

        protected readonly LocalizationBase _localization;
        protected readonly IHttpContextAccessor _httpContextAccessor;

        /// <summary>
        /// Khởi tạo map error code và message
        /// </summary>
        /// <param name="localization"></param>
        /// <param name="httpContext"></param>
        /// <exception cref="InvalidOperationException"></exception>
        public MapErrorCodeBase(LocalizationBase localization,
            IHttpContextAccessor httpContext)
        {
            foreach (var errorCode in Enum.GetValues(typeof(ErrorCode)))
            {
                var code = (ErrorCode)errorCode;
                var messageKey = PrefixError + errorCode.ToString();
                //thêm mã lỗi vào map có dạng Map[404] = "error_NotFound"
                Map[code] = messageKey;
            }
            _localization = localization;
            _httpContextAccessor = httpContext;

            var enums = (ErrorCode[])Enum.GetValues(typeof(ErrorCode));
            if (enums.Length != enums.Distinct().Count())
            {
                throw new InvalidOperationException($"enum {nameof(ErrorCode)} has duplicate value");
            }
        }

        /// <summary>
        /// Lấy message key cho error code
        /// </summary>
        /// <param name="errorCode"></param>
        /// <returns></returns>
        /// <exception cref="InvalidOperationException"></exception>
        public string GetErrorMessageKey(ErrorCode errorCode)
        {
            Map.TryGetValue(errorCode, out string messageKey);
            return messageKey ?? throw new InvalidOperationException($"Not found messageKey for errorCode: {errorCode}");
        }

        /// <summary>
        /// Lấy error message
        /// </summary>
        /// <param name="errorCode"></param>
        /// <returns></returns>
        public string GetErrorMessage(ErrorCode errorCode)
        {
            return _localization.Localize(GetErrorMessageKey(errorCode));
        }
    }
}
