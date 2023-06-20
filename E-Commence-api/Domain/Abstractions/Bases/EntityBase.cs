using ECommerce.Domain.Abstractions.Interfaces;

namespace ECommerce.Domain.Abstractions.Base;

public abstract class EntityBase<TKey> : IAuditEntity, IDeleteEntity, IEntity<TKey> where TKey : notnull
{
    //public Guid Id { get; protected set; } = Guid.NewGuid();
    public virtual TKey Id { get; protected set; } = default!;

    public DateTimeOffset CreatedAt { get; init; } = DateTimeOffset.UtcNow;
    public string? CreatedBy { get; init; }
    public DateTimeOffset? UpdatedAt { get; set; }
    public string? UpdatedBy { get; set; }

    public bool IsDeleted { get; set; }
}
