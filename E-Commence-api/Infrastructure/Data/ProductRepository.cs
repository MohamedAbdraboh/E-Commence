using ECommerce.Domain.Entities;
using ECommerce.Domain.Interfaces;
using Infrastructure.Abstractions;

namespace ECommerce.Infrastructure.Data;

public class ProductRepository : RepositoryBase<Product>, IProductRepository
{
    public ProductRepository(ECommerceDbContext dbContext) : base(dbContext)
    {
    }
}
