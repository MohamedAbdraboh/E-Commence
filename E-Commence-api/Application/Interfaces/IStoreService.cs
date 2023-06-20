using ECommerce.Domain.Entities;
using ECommerce.Domain.Results;

namespace ECommerce.Application.Interfaces;
public interface IStoreService
{
    Task<Result<Store>> GetStoreAsync(Guid storeId);
    Task<Result<List<Store>>> GetAllStoresAsync();
    Task<Result<Store>> AddStoreAsync(Store store);
    Task<Result<Store>> UpdateStoreAsync(Guid storeId, Store store);
    Task<Result<bool>> DeleteStoreAsync(Guid storeId);
    Task<Result<bool>> DeletePermanentlyAsync(Guid storeId);
}