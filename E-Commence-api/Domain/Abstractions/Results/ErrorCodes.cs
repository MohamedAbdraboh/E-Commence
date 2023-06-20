namespace ECommerce.Domain.Results;

public static class ErrorCodes
{
    public const string UnknownError = "Common:UnknownError";
    public const string ValidationError = "Common:ValidationError";

    public static class Http
    {
        public const string InternalServerError = "HTTP:InternalServerError";
    }
}
