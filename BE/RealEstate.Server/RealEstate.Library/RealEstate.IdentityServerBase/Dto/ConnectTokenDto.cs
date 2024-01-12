using Microsoft.AspNetCore.Mvc;

namespace RealEstate.IdentityServerBase.Dto
{
    public class ConnectTokenDto
    {
        [FromForm(Name = "grant_type")]
        public string GrantType { get; set; } = null!;
        [FromForm(Name = "username")]
        public string Username { get; set; } = null!;
        [FromForm(Name = "password")]
        public string Password { get; set; } = null!;
        [FromForm(Name = "scope")]
        public string Scope { get; set; } = null!;
        [FromForm(Name = "client_id")]
        public string ClientId { get; set; } = null!;
        [FromForm(Name = "client_secret")]
        public string Client_Secret { get; set; } = null!;
    }
}
