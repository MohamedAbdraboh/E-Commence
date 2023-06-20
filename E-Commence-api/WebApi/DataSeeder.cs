using ECommerce.Domain.Entities;
using Infrastructure.Abstractions;

namespace Infrastructure.EntityConfigurations
{
    public class DataSeeder
    {
        public static void Seed(IApplicationBuilder applicationBuilder)
        {
            using (var serviceScope = applicationBuilder.ApplicationServices.CreateScope())
            {
                var _dbContext = serviceScope.ServiceProvider.GetService<ECommerceDbContext>();

                if (_dbContext is not null && _dbContext.Stores is not null)
                {
                    if (!_dbContext.Stores.Any())
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
                            store.Products = defaultProducts;

                            IList<Branch> defaultBrances = new List<Branch>();
                            for (int ii = 1; ii < 7; ii++)
                            {
                                var branch = new Branch
                                {
                                    Name = $"Branch ${i}-{ii}",
                                    BranchNumber = $"BranchNumber-${i}-{ii}",
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
                            store.Branches = defaultBrances;

                            _dbContext.Stores.Add(store);
                        }

                        _dbContext.SaveChanges();
                    }
                }

            }
        }
    }

}
