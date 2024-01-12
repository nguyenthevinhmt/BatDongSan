namespace RealEstate.ApplicationService.AuthModule.Dtos
{
    /// <summary>
    /// Tài khoản thực hiện việc nào đó
    /// </summary>
    public class UserByDto
    {
        public int Id { get; set; }
        public string? Username { get; set; }
        public string? FullName { get; set; }
        public int UserType { get; set; }
    }
}
