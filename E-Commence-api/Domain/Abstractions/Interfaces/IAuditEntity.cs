namespace ECommerce.Domain.Abstractions.Interfaces;

public interface IAuditEntity
{
    DateTimeOffset CreatedAt { get; }
    string? CreatedBy { get; }
    DateTimeOffset? UpdatedAt { get; }
    string? UpdatedBy { get; }
}
