using Microsoft.AspNetCore.Mvc;

namespace RealEstate.IdentityServerBase.Dto
{
    public class ConnectTokenDto
    {
        [FromForm(Name = "grant_type")]
        public string GrantType { get; set; } = null!;
        [FromForm(Name = "username")]
        public string? Username { get; set; }
        [FromForm(Name = "password")]
        public string? Password { get; set; } 
        [FromForm(Name = "scope")]
        public string Scope { get; set; } = null!;
        [FromForm(Name = "client_id")]
        public string ClientId { get; set; } = null!;
        [FromForm(Name = "client_secret")]
        public string Client_Secret { get; set; } = null!;
        [FromForm(Name = "refresh_token")]
        public string? RefreshToken { get; set; }
    }
}
