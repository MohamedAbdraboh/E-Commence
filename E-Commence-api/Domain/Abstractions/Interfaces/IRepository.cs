using ECommerce.Domain.Abstractions.Base;

namespace ECommerce.Domain.Abstractions.Interfaces;

public interface IRepository<T>
    where T : EntityBase<Guid>
{
    Task<T> AddAsync(T entity);
    Task<IEnumerable<T>> AddRangeAsync(IEnumerable<T> entities);
    Task UpdateAsync(T entity);
    Task UpdateRangeAsync(IEnumerable<T> entities);
    Task DeleteAsync(T entity);
    Task DeleteRangeAsync(IEnumerable<T> entities);
    Task<int> SaveChangesAsync();
    //Task<T> GetByIdAsync<TId>(TId id) where TId : notnull;
    Task<T> GetByIdAsync(Guid id);
    Task<List<T>> ListAsync();
    Task<List<T>> ListAsync<T>(Func<T, bool> predicate);
    Task<int> CountAsync();
    Task<bool> AnyAsync();
}