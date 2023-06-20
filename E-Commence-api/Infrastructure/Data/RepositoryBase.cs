using ECommerce.Domain.Abstractions.Base;
using ECommerce.Domain.Abstractions.Interfaces;
using Infrastructure.Abstractions;
using Microsoft.EntityFrameworkCore;

namespace ECommerce.Infrastructure.Data;
public abstract class RepositoryBase<T> : IRepository<T> where T : EntityBase<Guid>
{
    protected ECommerceDbContext _dbContext { get; }
    private readonly DbSet<T> _dbSet;
    protected RepositoryBase(ECommerceDbContext dbContext)
    {
        _dbContext = dbContext;
        _dbSet = _dbContext.Set<T>();
    }
    public virtual async Task<T> AddAsync(T entity)
    {
        await _dbSet.AddAsync(entity);
        await SaveChangesAsync();
        return entity;
    }
    public virtual async Task<IEnumerable<T>> AddRangeAsync(IEnumerable<T> entities)
    {
        _dbSet.AddRange(entities);
        await SaveChangesAsync();
        return entities;
    }
    public virtual async Task UpdateAsync(T entity)
    {
        _dbSet.Update(entity);
        await SaveChangesAsync();
    }
    public virtual async Task UpdateRangeAsync(IEnumerable<T> entities)
    {
        _dbSet.UpdateRange(entities);
        await SaveChangesAsync();
    }
    public virtual async Task DeleteAsync(T entity)
    {
        _dbSet.Remove(entity);
        await SaveChangesAsync();
    }
    public virtual async Task DeleteRangeAsync(IEnumerable<T> entities)
    {
        _dbSet.RemoveRange(entities);
        await SaveChangesAsync();
    }
    public virtual async Task<int> SaveChangesAsync()
    {
        return await _dbContext.SaveChangesAsync();
    }
    public virtual async Task<T> GetByIdAsync(Guid id)
    {
        return await _dbSet.FindAsync(id);
    }
    public async Task<List<T>> ListAsync()
    {
        return await _dbSet.ToListAsync();
    }
    //public async Task<List<T>> ListAsync<T>(Expression<Func<T, bool>> predicate = null)//, Expression<Func<T, TResult>> selector = null, params Expression<Func<T, object>>[] includeProperties)
    //{
    //    IQueryable<T> query = (IQueryable<T>)_dbSet;
    //    if (predicate != null)
    //    {
    //        query = query.Where(predicate);
    //    }
    //    return await query.ToListAsync();
    //    //if (includeProperties != null)
    //    //{
    //    //    foreach (var includeProperty in includeProperties)
    //    //    {
    //    //        query = query.Include(includeProperty);
    //    //    }
    //    //}
    //    //return await query.Select(selector).ToListAsync();
    //}
    public async Task<List<T>> ListAsync<T>(Func<T, bool> predicate)
    {
        IQueryable<T> query = (IQueryable<T>)_dbSet;
        return await Task.Run(() => query.Where(predicate).ToList());
    }
    public async Task<int> CountAsync()
    {
        return await _dbSet.CountAsync();
    }
    public async Task<bool> AnyAsync()
    {
        return await _dbSet.AnyAsync();
    }
}