namespace Domain.Abstractions.Interfaces;

public abstract class EntityBase<TKey> : IAuditEntity, IDeleteEntity, IEntity<TKey> where TKey : notnull
{
    //public Guid Id { get; protected set; } = Guid.NewGuid();
    public virtual TKey Id { get; protected set; } = default!;


    public DateTimeOffset CreatedAt { get; protected init; } = DateTimeOffset.UtcNow;
    public string? CreatedBy { get; protected init; }
    public DateTimeOffset? UpdatedAt { get; protected set; }
    public string? UpdatedBy { get; protected set; }

    public bool IsDeleted { get; protected set; }
}
