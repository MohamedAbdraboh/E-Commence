using ECommerce.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System.Reflection;

namespace Infrastructure.Abstractions;

public class ECommerceDbContext : DbContext
{
    public DbSet<Store> Stores { get; set; } = default!;
    public DbSet<Product> Products { get; set; } = default!;
    public DbSet<Branch> Branches { get; set; } = default!;
    public DbSet<BranchProduct> branchProducts { get; set; } = default!;


    public ECommerceDbContext(DbContextOptions<ECommerceDbContext> options)
        : base(options)
    {
    }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        //optionsBuilder.UseLazyLoadingProxies();
        base.OnConfiguring(optionsBuilder);
    }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);
        builder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
        //DataSeeding();
    }

    private void DataSeeding()
    {
        if (Stores is not null)
        {
            if (Stores.Count() == 0)
            {
                for (int i = 1; i < 4; i++)
                {
                    var store = new Store
                    {
                        Name = $"Store {i}",
                        Category = "Technology",
                        Img = $"technologyStore{i}.png",
                        CreatedAt = DateTimeOffset.UtcNow
                    };

                    IList<Product> defaultProducts = new List<Product>();
                    for (int ii = 1; ii < 7; ii++)
                    {
                        defaultProducts.Add(
                        new Product
                        {
                            Name = $"Product {ii}",
                            Description = $"Product {ii} Description",
                            Price = 10,
                            Category = "Technology",
                            Img = $"techProduct{ii}.png",
                            CreatedAt = DateTimeOffset.UtcNow,
                            StoreId = store.Id
                        });
                    }

                    IList<Branch> defaultBrances = new List<Branch>();
                    for (int ii = 1; ii < 7; ii++)
                    {
                        var branch = new Branch
                        {
                            Name = $"Branch {ii}",
                            BranchNumber = $"BranchNumber-{ii}",
                            Address = $"Street {ii} - Building {ii}",

                            CreatedAt = DateTimeOffset.UtcNow,
                            StoreId = store.Id
                        };

                        foreach (var product in defaultProducts)
                        {
                            branch.BranchProducts = new List<BranchProduct>();
                            branch?.BranchProducts?.Add(new BranchProduct
                            {
                                ProductId = product.Id,
                                BranchId = branch.Id,
                                Amount = ii,
                                CreatedAt = DateTimeOffset.UtcNow,
                            });
                        }
                        defaultBrances.Add(branch);
                    }

                    Stores.Add(store);
                }

                SaveChangesAsync();
            }
        }

    }
}