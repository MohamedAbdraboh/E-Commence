namespace ECommerce.Domain.Results;

public class Error
{
    public string Code { get; }
    public string Description { get; }

    public Error(string? code, string description)
    {
        Code = code ?? ErrorCodes.UnknownError;
        Description = description;
    }

    public Error(Exception exception)
        : this(exception.GetType().FullName, exception.Message)
    { }
}
