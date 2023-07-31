using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace OnePlace.BOL.Exceptions.Handlers
{
    public class DomainExceptionHandler<T>: IDomainExceptionHandler where T : DomainException
    {
        protected virtual int Status => StatusCodes.Status500InternalServerError;

        public virtual Task Handle(HttpContext httpContext, T exception)
        {
            if (httpContext.Response.HasStarted)
                return Task.CompletedTask;

            httpContext.Response.ContentType = "application/problem+json";
            httpContext.Response.StatusCode = this.Status;

            var responseData = new ProblemDetails
            {
                Title = exception.Name,
                Detail = exception.Message,
                Status = Status
            };

            var settings = new JsonSerializerSettings
            {
                ContractResolver = new DefaultContractResolver
                {
                    NamingStrategy = new CamelCaseNamingStrategy (true, false)
                }
            };

            var response = JsonConvert.SerializeObject(responseData, settings);

            return httpContext.Response.WriteAsync(response);
        }

        public virtual Task Handle(HttpContext httpContext, object exception)
        {
            return Handle(httpContext, (T)exception);
        }
    }
}
