namespace webapi.Exceptions
{
    public static class ExceptionExtension
    {
        public static IApplicationBuilder UseException(this IApplicationBuilder builder)
        {
            return builder.UseMiddleware<ExceptionMiddleware>();
        }
    }
}
