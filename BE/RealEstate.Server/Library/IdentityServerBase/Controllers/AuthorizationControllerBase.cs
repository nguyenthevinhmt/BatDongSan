using Microsoft.AspNetCore.Mvc;
using OpenIddict.Abstractions;

namespace RealEstate.IdentityServerBase.Controllers
{
    public abstract class AuthorizationControllerBase : Controller
    {
        protected readonly IOpenIddictApplicationManager _applicationManager;

        public AuthorizationControllerBase(IOpenIddictApplicationManager applicationManager)
        {
            _applicationManager = applicationManager;
        }
    }
}
