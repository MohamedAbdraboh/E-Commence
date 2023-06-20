using ECommerce.Domain.Interfaces;
using ECommerce.Infrastructure.Data;
using Microsoft.Extensions.DependencyInjection;

namespace Infrastructure;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructure(this IServiceCollection services)
    {
        services.AddScoped<IStoreRepository, StoreRepository>();
        services.AddScoped<IBranchRepository, BranchRepository>();
        services.AddScoped<IProductRepository, ProductRepository>();

        return services;
    }
}
