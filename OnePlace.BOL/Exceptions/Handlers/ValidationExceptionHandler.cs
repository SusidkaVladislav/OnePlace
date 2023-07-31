using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OnePlace.BOL.Exceptions.Handlers
{
    public class ValidationExceptionHandler: DomainExceptionHandler<ValidationException>
    {
        protected override int Status => StatusCodes.Status400BadRequest;

        public override Task Handle(HttpContext httpContext, ValidationException exception)
        {
            if (httpContext.Response.HasStarted)
                return Task.CompletedTask;

            httpContext.Response.ContentType = "application/problem+json";
            httpContext.Response.StatusCode = Status;

            var errorsDict = exception.Errors
                .Select(x => new KeyValuePair<string, string[]>(x.Key, x.Value.ToArray()))
                .ToDictionary(x => x.Key, x => x.Value);

            // форматую валідаційні помилки:
            // [Назва властивості 1] - помилка 1, помилка 2. [Назва властивості 2] - помилка 1, помилка 2.
            var validationDetails = string.Join(". ", errorsDict.Select(x => $"[{x.Key}] - {string.Join(", ", x.Value)}"));
            var settings = new JsonSerializerSettings
            {
                ContractResolver = new DefaultContractResolver
                {
                    NamingStrategy = new CamelCaseNamingStrategy(true, false)
                }
            };
            var responseData = new ValidationProblemDetails(errorsDict)
            {
                Title = exception.Name,
                Detail = $"Ось список помилок: {validationDetails}",
                Status = Status
            };

            var response = JsonConvert.SerializeObject(responseData, settings);

            return httpContext.Response.WriteAsync(response);
        }
    }
}
