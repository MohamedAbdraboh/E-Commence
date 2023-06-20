using ECommerce.Domain.Entities;
using ECommerce.Domain.Interfaces;
using Infrastructure.Abstractions;

namespace ECommerce.Infrastructure.Data;

public class StoreRepository : RepositoryBase<Store>, IStoreRepository
{
    public StoreRepository(ECommerceDbContext dbContext) : base(dbContext)
    {
    }
}
