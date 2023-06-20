using ECommerce.Domain.Entities;
using ECommerce.Domain.Results;

namespace ECommerce.Application.Interfaces;
public interface IProductService
{
    Task<Result<List<Product>>> GetAllProductsAsync();  
    Task<Result<Product>> GetProductAsync(Guid productId);
    Task<Result<Product>> AddProductAsync(Product product);
    Task<Result<Product>> UpdateProductAsync(Guid productId, Product product);
    Task<Result<bool>> DeleteProductAsync(Guid productId);
    Task<Result<bool>> DeletePermanentlyAsync(Guid productId);
}
