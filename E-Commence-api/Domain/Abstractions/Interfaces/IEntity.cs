namespace Domain.Abstractions.Interfaces;

public interface IEntity<out TKey>
    where TKey : notnull
{
    TKey Id { get; }
}
