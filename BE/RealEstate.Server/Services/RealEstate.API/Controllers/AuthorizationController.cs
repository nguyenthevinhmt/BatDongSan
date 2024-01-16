using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using OpenIddict.Abstractions;
using OpenIddict.Server.AspNetCore;
using RealEstate.ApplicationService.AuthModule.Abstracts;
using RealEstate.Domain.Entities;
using RealEstate.IdentityServerBase.Controllers;
using RealEstate.IdentityServerBase.Dto;
using RealEstate.Utils;
using RealEstate.Utils.ConstantVariables.User;
using RealEstate.Utils.CustomException;
using RealEstate.Utils.Localization;
using System.Security.Claims;
using static OpenIddict.Abstractions.OpenIddictConstants;

namespace RealEstate.API.Controllers
{
    [ApiController]
    public class AuthorizationController : AuthorizationControllerBase
    {
        private readonly IUserService _userServices;
        private readonly MapErrorCodeBase _mapErrorCode;
        private readonly LocalizationBase _localization;
        private readonly IOpenIddictTokenManager _tokenManager;

        public AuthorizationController(
            IOpenIddictApplicationManager applicationManager,
            IOpenIddictTokenManager tokenManager,
            IUserService userServices,
            MapErrorCodeBase mapErrorCode,
            LocalizationBase localization) : base(applicationManager)
        {
            _tokenManager = tokenManager;
            _userServices = userServices;
            _localization = localization;
            _mapErrorCode = mapErrorCode;
        }

        [HttpPost("~/connect/token"), IgnoreAntiforgeryToken, Produces("application/json"), Consumes("application/x-www-form-urlencoded")]
        public async Task<IActionResult> Exchange([FromForm] ConnectTokenDto _)
        {
            // Create a new ClaimsIdentity containing the claims that
            // will be used to create an id_token, a token or a code.
            var identity = new ClaimsIdentity(TokenValidationParameters.DefaultAuthenticationType, Claims.Name, Claims.Role);
            string localizationName = Request.HttpContext.Items[LocalizationQuery.QueryName]!.ToString()!;

            var request = HttpContext.GetOpenIddictServerRequest();
            try
            {
                if (request!.IsClientCredentialsGrantType())
                {
                    // Note: the client credentials are automatically validated by OpenIddict:
                    // if client_id or client_secret are invalid, this action won't be invoked.

                    var application = await _applicationManager.FindByClientIdAsync(request!.ClientId!) ??
                        throw new InvalidOperationException("The application cannot be found.");

                    // Use the client_id as the subject identifier.
                    identity.SetClaim(Claims.Subject, await _applicationManager.GetClientIdAsync(application));
                    identity.SetClaim(Claims.Name, await _applicationManager.GetDisplayNameAsync(application));

                    identity.SetDestinations(static claim => claim.Type switch
                    {
                        // Allow the "name" claim to be stored in both the access and identity tokens
                        // when the "profile" scope was granted (by calling principal.SetScopes(...)).
                        Claims.Name when claim.Subject!.HasScope(Scopes.Profile)
                            => new[] { Destinations.AccessToken, Destinations.IdentityToken },

                        // Otherwise, only store the claim in the access tokens.
                        _ => new[] { Destinations.AccessToken }
                    });

                    return SignIn(new ClaimsPrincipal(identity), OpenIddictServerAspNetCoreDefaults.AuthenticationScheme);
                }
                else if (request!.IsPasswordGrantType())
                {
                    var user = _userServices.ValidateUser(request!.Username!, request.Password!);

                    SetClaims(identity, user);

                    // Set the list of scopes granted to the client application.
                    identity.SetScopes(new[]
                    {
                        Scopes.OpenId,
                        Scopes.Email,
                        Scopes.Profile,
                        Scopes.Roles,
                        Scopes.OfflineAccess
                    }.Intersect(request.GetScopes()));

                    identity.SetDestinations(GetDestinations);

                    var ticket = new AuthenticationTicket(
                        new ClaimsPrincipal(identity),
                        new AuthenticationProperties(),
                        OpenIddictServerAspNetCoreDefaults.AuthenticationScheme);

                    return SignIn(new ClaimsPrincipal(identity), OpenIddictServerAspNetCoreDefaults.AuthenticationScheme);
                }
                else if (request!.IsRefreshTokenGrantType())
                {
                    // Retrieve the claims principal stored in the refresh token.
                    var result = await HttpContext.AuthenticateAsync(OpenIddictServerAspNetCoreDefaults.AuthenticationScheme);

                    // Retrieve the user profile corresponding to the refresh token.
                    var user = _userServices.FindById(int.Parse(result.Principal!.GetClaim(UserClaimTypes.UserId)!))
                        ?? throw new UserFriendlyException(Utils.ConstantVariables.Shared.ErrorCode.UserNotFound);

                    // Ensure the user is still allowed to sign in.
                    if (user.Status != UserStatus.ACTIVE)
                    {
                        throw new UserFriendlyException(Utils.ConstantVariables.Shared.ErrorCode.UserIsDeactive);
                    }

                    // Override the user claims present in the principal in case they changed since the refresh token was issued.
                    // Add the claims that will be persisted in the tokens.
                    SetClaims(identity, user);

                    identity.SetDestinations(GetDestinations);

                    return SignIn(new ClaimsPrincipal(identity), OpenIddictServerAspNetCoreDefaults.AuthenticationScheme);
                }
            }
            catch (UserFriendlyException ex)
            {
                var properties = new AuthenticationProperties(new Dictionary<string, string>
                {
                    [OpenIddictServerAspNetCoreConstants.Properties.Error] = Errors.InvalidGrant,
                    [OpenIddictServerAspNetCoreConstants.Properties.ErrorDescription] = _localization.Localize(_mapErrorCode.GetErrorMessageKey(ex.ErrorCode))
                });
                return Forbid(properties, OpenIddictServerAspNetCoreDefaults.AuthenticationScheme);
            }
            catch (Exception ex)
            {
                var properties = new AuthenticationProperties(new Dictionary<string, string>
                {
                    [OpenIddictServerAspNetCoreConstants.Properties.Error] = Errors.ServerError,
                    [OpenIddictServerAspNetCoreConstants.Properties.ErrorDescription] = ex.Message
                });
                return Forbid(properties, OpenIddictServerAspNetCoreDefaults.AuthenticationScheme);
            }
            return BadRequest(new OpenIddictResponse
            {
                Error = Errors.UnsupportedGrantType,
                ErrorDescription = "The specified grant type is not supported."
            });
        }

        /// <summary>
        /// Đăng xuất và revoke token
        /// </summary>
        /// <returns></returns>
        [Authorize]
        [HttpPost("~/connect/logout"), IgnoreAntiforgeryToken, Produces("application/json"), Consumes("application/x-www-form-urlencoded")]
        public async Task<IActionResult> Logout()
        {
            var authorizationId = HttpContext.User.Claims.FirstOrDefault(c => c.Type == "oi_au_id")?.Value;
            if (authorizationId == null)
            {
                return SignOut(OpenIddictServerAspNetCoreDefaults.AuthenticationScheme);
            }
            var tokens = _tokenManager.FindByAuthorizationIdAsync(authorizationId);
            //HttpContext.Request.Headers["Content-Type"] = "application/x-www-form-urlencoded";
            await foreach (var token in tokens)
            {
                await _tokenManager.TryRevokeAsync(token);
            }
            return SignOut(OpenIddictServerAspNetCoreDefaults.AuthenticationScheme);
        }

        private void SetClaims(ClaimsIdentity identity, User user)
        {
            // Add the claims that will be persisted in the tokens.
            identity.SetClaim(Claims.Username, user.Username)
                    .SetClaim(Claims.Subject, user.Id)
                    .SetClaim(Claims.Issuer, $"{Request.Scheme}://{Request.Host.Value}")
                    .SetClaim(Claims.Email, user.Email)
                    .SetClaim(Claims.Name, user.Fullname)
                    .SetClaim(UserClaimTypes.UserType, user.UserType)
                    .SetClaim(UserClaimTypes.UserId, user.Id);

            //if (user.BusinessCustomerId is not null)
            //{
            //    identity.SetClaim(UserClaimTypes.BusinessCustomerId, user.BusinessCustomerId);
            //}
            //if (user.RestaurantId is not null)
            //{
            //    identity.SetClaim(UserClaimTypes.RestaurantId, user.RestaurantId);
            //}
        }

        private static IEnumerable<string> GetDestinations(Claim claim)
        {
            // Note: by default, claims are NOT automatically included in the access and identity tokens.
            // To allow OpenIddict to serialize them, you must attach them a destination, that specifies
            // whether they should be included in access tokens, in identity tokens or in both.

            switch (claim.Type)
            {
                case Claims.Name:
                    yield return Destinations.AccessToken;

                    if (claim.Subject!.HasScope(Scopes.Profile))
                        yield return Destinations.IdentityToken;

                    yield break;

                case Claims.Email:
                    yield return Destinations.AccessToken;

                    if (claim.Subject!.HasScope(Scopes.Email))
                        yield return Destinations.IdentityToken;

                    yield break;

                case Claims.Role:
                    yield return Destinations.AccessToken;

                    if (claim.Subject!.HasScope(Scopes.Roles))
                        yield return Destinations.IdentityToken;

                    yield break;

                // Never include the security stamp in the access and identity tokens, as it's a secret value.
                case "AspNet.Identity.SecurityStamp": yield break;

                default:
                    yield return Destinations.AccessToken;
                    yield break;
            }
        }
    }
}
