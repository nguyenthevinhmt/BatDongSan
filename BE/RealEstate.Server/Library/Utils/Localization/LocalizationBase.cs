using Microsoft.AspNetCore.Http;
using System.Reflection;
using System.Xml.Linq;

namespace RealEstate.Utils.Localization
{
    public abstract class LocalizationBase
    {
        protected readonly string RootNameSpace;
        public readonly Dictionary<string, Dictionary<string, string>> Dictionary = new();
        public const string DicNameDefault = LocalizationNames.Vietnamese;
        protected readonly IHttpContextAccessor _httpContextAccessor;

        public LocalizationBase(IHttpContextAccessor httpContextAccessor, string rootNameSpace)
        {
            _httpContextAccessor = httpContextAccessor;
            RootNameSpace = rootNameSpace ?? throw new ArgumentNullException(nameof(rootNameSpace));
            var assembly = Assembly.GetCallingAssembly();
            foreach (var resourceName in assembly.GetManifestResourceNames())
            {
                using Stream stream = assembly.GetManifestResourceStream(resourceName)!;
                XElement element = XElement.Load(stream);
                var dicName = element.FirstAttribute!.Value;

                var dicValues = element.Elements("texts").Elements("text")
                    .ToDictionary(e => e.Attribute("name")!.Value, e => e.Attribute("value")?.Value ?? e.Value);
                Dictionary[dicName] = dicValues;
            }
        }

        /// <summary>
        /// Lấy nội dung từ tên từ điển và tên key
        /// </summary>
        /// <param name="dicName"></param>
        /// <param name="keyName"></param>
        /// <returns></returns>
        private string Localize(string dicName, string keyName)
        {
            try
            {
                return Dictionary[dicName][keyName];
            }
            catch
            {
                return $"{dicName}:{keyName}";
            }
        }

        public string Localize(string keyName)
        {
            string localizationName = _httpContextAccessor.HttpContext.Items[LocalizationQuery.QueryName].ToString()!;
            return Localize(localizationName, keyName);
        }
    }
}
