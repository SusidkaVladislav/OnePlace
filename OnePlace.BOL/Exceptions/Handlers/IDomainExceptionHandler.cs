using Microsoft.AspNetCore.Http;

namespace OnePlace.BOL.Exceptions.Handlers
{
    public interface IDomainExceptionHandler
    {
        Task Handle(HttpContext httpContext, object exception);
    }
}