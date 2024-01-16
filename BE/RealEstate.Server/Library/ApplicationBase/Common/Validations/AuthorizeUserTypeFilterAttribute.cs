using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.DependencyInjection;
using RealEstate.Utils.ConstantVariables.User;
using RealEstate.Utils.Localization;

namespace RealEstate.ApplicationBase.Common.Validations
{
    public class AuthorizeUserTypeFilterAttribute : Attribute, IAuthorizationFilter
    {
        private readonly int[] _userTypes;
        private LocalizationBase _localization = null!;
        private IHttpContextAccessor _httpContext = null!;

        public AuthorizeUserTypeFilterAttribute(params int[] userTypes)
        {
            _userTypes = userTypes ?? Array.Empty<int>();
        }

        private void GetServices(AuthorizationFilterContext context)
        {
            _localization = context.HttpContext.RequestServices.GetRequiredService<LocalizationBase>();
            _httpContext = context.HttpContext.RequestServices.GetRequiredService<IHttpContextAccessor>();
        }

        public void OnAuthorization(AuthorizationFilterContext context)
        {
            bool hasAllowAnonymous = context.ActionDescriptor.EndpointMetadata
                                 .Any(em => em.GetType() == typeof(AllowAnonymousAttribute));

            if (hasAllowAnonymous)
                return;

            GetServices(context);
            var userType = _httpContext.GetCurrentUserType();
            //if (userType == UserTypes.ADMIN)
            //{
            //    return;
            //}

            if (!_userTypes.Contains(userType))
            {
                context.Result = new UnauthorizedObjectResult(new { message = _localization.Localize("error_UserNotHavePermission") });
            }
        }
    }
    /// <summary>
    /// Filter những user là quản trị
    /// </summary>
    public class AuthorizeAdminUserTypeFilterAttribute : AuthorizeUserTypeFilterAttribute
    {
        public AuthorizeAdminUserTypeFilterAttribute() : base(UserTypes.ADMIN)
        {
        }
    }

    /// <summary>
    /// Filter những user là khách hàng
    /// </summary>
    public class AuthorizeCustomerTypeFilterAttribute : AuthorizeUserTypeFilterAttribute
    {
        public AuthorizeCustomerTypeFilterAttribute() : base(UserTypes.CUSTOMER)
        {
        }
    }

    /// <summary>
    /// Filter những user là người dùng đã đăng nhập
    /// </summary>
    public class AuthorizeUserSystemTypeFilterAttribute : AuthorizeUserTypeFilterAttribute
    {
        public AuthorizeUserSystemTypeFilterAttribute() : base(UserTypes.ADMIN,UserTypes.CUSTOMER)
        {
        }
    }
}
