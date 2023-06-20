namespace ECommerce.Domain.Results;

public class Result : Result<byte?>
{
    public Result()
    {
        throw new InvalidOperationException("This constructor is not suppose to be used, It was added for fastendpoint response type.");
    }

    public Result(byte? data) : base(data)
    { }

    public Result(string code, string description) : base(code, description)
    { }

    public Result(params Error[] errors) : base(errors)
    { }

    public Result(IEnumerable<Error> errors) : base(errors)
    { }

    public Result(Exception exception) : base(exception)
    { }

    public static implicit operator Result(byte? data) => new(data);

    public static implicit operator Result(Error error)  => new(error);

    public static implicit operator Result(Error[] errors)  => new(errors);

    public static implicit operator Result(List<Error> errors) => new(errors);

    public static implicit operator Result(Exception exception) => new(exception);
}
