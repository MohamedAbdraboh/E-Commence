using ECommerce.Domain.Entities;
using ECommerce.Domain.Interfaces;
using Infrastructure.Abstractions;

namespace ECommerce.Infrastructure.Data;

public class BranchRepository : RepositoryBase<Branch>, IBranchRepository
{
    public BranchRepository(ECommerceDbContext dbContext) : base(dbContext)
    {
    }
}
