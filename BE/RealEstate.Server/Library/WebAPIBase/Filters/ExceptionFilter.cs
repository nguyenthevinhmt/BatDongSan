using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using RealEstate.Utils;
using RealEstate.Utils.ConstantVariables.Shared;
using RealEstate.Utils.CustomException;
using RealEstate.Utils.Localization;
using System.Text.Json;

namespace WebAPIBase.Filters
{
    public class ExceptionFilter : IExceptionFilter
    {
        public void OnException(ExceptionContext context)
        {
            var logger = context.HttpContext.RequestServices.GetService<ILogger<ExceptionFilter>>();
            var mapErrorCode = context.HttpContext.RequestServices.GetService<MapErrorCodeBase>();
            var localization = context.HttpContext.RequestServices.GetService<LocalizationBase>();

            var request = context.HttpContext.Request;
            string errStr = $"Path = {request.Path}, Query = {JsonSerializer.Serialize(request.Query)}";
            ErrorCode errorCode;
            string message = context.Exception.Message;
            if (context.Exception is UserFriendlyException userFriendlyException)
            {
                errorCode = userFriendlyException.ErrorCode;
                try
                {
                    message = !string.IsNullOrWhiteSpace(userFriendlyException.MessageLocalize)
                        ? localization!.Localize(userFriendlyException.MessageLocalize)
                            : mapErrorCode!.GetErrorMessage(userFriendlyException.ErrorCode);
                }
                catch (Exception ex)
                {
                    message = ex.Message;
                }
                logger?.LogInformation(context.Exception, $"{context.Exception.GetType()}: {errStr}, ErrorCode = {errorCode}, Message = {message}");
            }
            else
            {
                logger?.LogError(context.Exception, $"{context.Exception.GetType()}: {errStr}, Message = {message}");
                errorCode = ErrorCode.InternalServerError;
            }
            ApiResponse response = new(StatusCode.Error, nameof(ExceptionFilter), (int)errorCode, message);
            context.Result = new JsonResult(response);
        }
    }
}
