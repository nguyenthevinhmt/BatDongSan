namespace RealEstate.ApplicationService.AuthModule.Dtos
{
    public class SetPasswordUserDto
    {
        public int Id { get; set; }
        /// <summary>
        /// Mật khẩu
        /// </summary>
        private string _password = null!;
        public string Password
        {
            get => _password;
            set => _password = value.Trim();
        }
    }
}
