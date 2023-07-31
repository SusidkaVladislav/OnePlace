using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using OnePlace.BOL.Exceptions;
using OnePlace.BOL.Exceptions.Handlers;

namespace webapi.Exceptions
{
    public class ExceptionMiddleware
    {
        private readonly RequestDelegate _next;

        public ExceptionMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task InvokeAsync(HttpContext httpContext)
        {
            try
            {
                await _next(httpContext);
            }
            catch (Exception exception)
            {
                if (exception is DomainException domainException)
                {
                    var handler = GetHandler(domainException);
                    await handler.Handle(httpContext, domainException);
                }
                else
                {
                    httpContext.Response.ContentType = "application/problem+json";
                    httpContext.Response.StatusCode = StatusCodes.Status500InternalServerError;

                    var responseData = new ProblemDetails
                    {
                        Title = "Unexpected error",
                        Detail = exception.Message,
                        Status = StatusCodes.Status500InternalServerError,
                    };

                    var settings = new JsonSerializerSettings
                    {
                        ContractResolver = new DefaultContractResolver
                        {
                            NamingStrategy = new SnakeCaseNamingStrategy(true, false)
                        }
                    };

                    var response = JsonConvert.SerializeObject(responseData, settings);
                    await httpContext.Response.WriteAsync(response);
                }
            }
        }

        private IDomainExceptionHandler GetHandler(DomainException exception)
        {
            return exception switch
            {
                BusinessException => new BusinessExceptionHandler(),
                ValidationException => new ValidationExceptionHandler(),
                NotFoundException => new NotFoundExceptionHandler(),
                _ => throw new NotImplementedException(),
            };
        }
    }
}
