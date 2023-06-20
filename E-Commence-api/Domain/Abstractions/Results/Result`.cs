namespace ECommerce.Domain.Results;

public class Result<TData>
{
    public bool HasErrors => Errors is not null && Errors.Any();
    public IEnumerable<Error>? Errors { get; protected init; }
    public TData? Data { get; protected init; }

    public Result()
    {
        throw new InvalidOperationException("This constructor is not suppose to be used, It was added for fastendpoint response type.");
    }

    public Result(TData data)
        => Data = data;

    public Result(string code, string description)
        => Errors = new List<Error> { new Error(code, description) };

    public Result(params Error[] errors)
        => Errors = errors;

    public Result(IEnumerable<Error> errors)
        => Errors = errors;

    public Result(Exception exception)
    {
        var errors = new List<Error>();

        while (exception is not null)
        {
            errors.Add(new Error(exception));
            exception = exception.InnerException!;
        }

        Errors = errors;
    }

    public static implicit operator Result<TData>(TData data)
    {
        if (data is Result<TData> result)
            return result;

        return new(data);
    }

    public static implicit operator Result<TData>(Error error) => new(error);

    public static implicit operator Result<TData>(Error[] errors) => new(errors);

    public static implicit operator Result<TData>(List<Error> errors) => new(errors);

    public static implicit operator Result<TData>(Exception exception) => new(exception);
}
