using RealEstate.Utils.Validation;
using System.Text.RegularExpressions;

namespace RealEstate.Utils.Securiry
{
    /// <summary>
    /// Sinh các mã code cho toàn hệ thống
    /// </summary>
    public static class GenerateCodes
    {
        public static string ResetPasswordToken()
        {
            Random random = new();
            const string chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            return new string(Enumerable.Repeat(chars, 30).Select(s => s[random.Next(s.Length)]).ToArray());
        }

        public static string GetRandomPassword()
        {
            Random random = new();
            const string chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            var plainPassword = "";

            var reg = new Regex(RegexPatterns.Password8Characters1Uppercase1Lowercase1Number);

            do
            {
                plainPassword = new string(Enumerable.Repeat(chars, 8).Select(s => s[random.Next(s.Length)]).ToArray());
            } while (!reg.IsMatch(plainPassword));

            return plainPassword;
        }

        public static string GetRandomOTP()
        {
            const string chars = "0123456789";
            Random random = new Random();
            char[] otpArray = new char[6];

            for (int i = 0; i < 6; i++)
            {
                otpArray[i] = chars[random.Next(chars.Length)];
            }

            return new string(otpArray);

        }
    }
}
