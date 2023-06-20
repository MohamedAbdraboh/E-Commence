using ECommerce.Application.Interfaces;
using ECommerce.Domain.Entities;
using ECommerce.Domain.Interfaces;
using ECommerce.Domain.Results;

namespace ECommerce.Application.Services;
public class ProductService : IProductService
{
    private readonly IProductRepository _productRepository;

    public ProductService(IProductRepository productRepository)
    {
        _productRepository = productRepository;
    }

    public async Task<Result<Product>> GetProductAsync(Guid productId)
    {
        try
        {
            var product = await _productRepository.GetByIdAsync(productId);
            if (product is null)
                return new Error("Product:ProductNotFound", $"Product with Id {productId} was not found.");

            return product;
        }
        catch (Exception ex)
        {
            return new Error("Product:Exception", ex.Message);
        }
    }

    public async Task<Result<List<Product>>> GetAllProductsAsync()
    {
        try
        {
            return await _productRepository.ListAsync();
        }
        catch (Exception ex)
        {
            return new Error("Product:Exception", ex.Message);
        }
    }

    public async Task<Result<Product>> AddProductAsync(Product product)
    {
        try
        {
            await _productRepository.AddAsync(product);
            return product;
        }
        catch (Exception ex)
        {
            return new Error("Product:Exception", ex.Message);
        }
    }

    public async Task<Result<Product>> UpdateProductAsync(Guid productId, Product product)
    {
        try
        {
            var existingProduct = await _productRepository.GetByIdAsync(productId);
            if (existingProduct is null)
                return new Error("Product:ProductNotFound", $"Product with Id {productId} was not found.");

            existingProduct.Amount = product.Amount;
            existingProduct.Price = product.Price;
            existingProduct.UpdatedAt = DateTimeOffset.UtcNow;

            await _productRepository.UpdateAsync(existingProduct);
            return existingProduct;
        }
        catch (Exception ex)
        {
            return new Error("Product:Exception", ex.Message);
        }
    }

    public async Task<Result<bool>> DeleteProductAsync(Guid productId)
    {
        try
        {
            var Product = await _productRepository.GetByIdAsync(productId);
            if (Product is null)
                return new Error("Product:ProductNotFound", $"Product with Id {productId} was not found.");

            Product.IsDeleted = true;
            await _productRepository.UpdateAsync(Product);
            return true;
        }
        catch (Exception ex)
        {
            return new Error("Product:Exception", ex.Message);
        }
    }

    public async Task<Result<bool>> DeletePermanentlyAsync(Guid productId)
    {
        try
        {
            var product = await _productRepository.GetByIdAsync(productId);
            if (product is null)
                return new Error("Product:ProductNotFound", $"Product with Id {productId} was not found.");

            await _productRepository.DeleteAsync(product);
            return true;
        }
        catch (Exception ex)
        {
            return new Error("Product:Exception", ex.Message);
        }
    }
}
