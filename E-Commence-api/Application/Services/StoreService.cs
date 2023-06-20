using ECommerce.Application.Interfaces;
using ECommerce.Domain.Entities;
using ECommerce.Domain.Interfaces;
using ECommerce.Domain.Results;

namespace ECommerce.Application.Services;
public class StoreService : IStoreService
{
    private readonly IStoreRepository _storeRepository;

    public StoreService(IStoreRepository storeRepository)
    {
        _storeRepository = storeRepository;
    }

    public async Task<Result<Store>> GetStoreAsync(Guid storeId)
    {
        try
        {
            var store = await _storeRepository.GetByIdAsync(storeId);
            if (store is null)
                return new Error("Store:StoreNotFound", $"Store with Id {storeId} was not found.");

            return store;
        }
        catch (Exception ex)
        {
            return new Error("Store:Exception", ex.Message);
        }
    }

    public async Task<Result<List<Store>>> GetAllStoresAsync()
    {
        try
        {
            return await _storeRepository.ListAsync<Store>(s => !s.IsDeleted);
        }
        catch (Exception ex)
        {
            return new Error("Store:Exception", ex.Message);
        }
    }

    public async Task<Result<Store>> AddStoreAsync(Store store)
    {
        try
        {
            await _storeRepository.AddAsync(store);
            return store;
        }
        catch (Exception ex)
        {
            return new Error("Store:Exception", ex.Message);
        }
    }

    public async Task<Result<Store>> UpdateStoreAsync(Guid storeId, Store store)
    {
        try
        {
            var existingStore = await _storeRepository.GetByIdAsync(storeId);
            if (existingStore is null)
                return new Error("Store:StoreNotFound", $"Store with Id {storeId} was not found.");

            existingStore.Name = store.Name;
            existingStore.UpdatedAt = DateTimeOffset.UtcNow;

            await _storeRepository.UpdateAsync(existingStore);
            return existingStore;
        }
        catch (Exception ex)
        {
            return new Error("Store:Exception", ex.Message);
        }
    }

    public async Task<Result<bool>> DeleteStoreAsync(Guid storeId)
    {
        try
        {
            var store = await _storeRepository.GetByIdAsync(storeId);
            if (store is null)
                return new Error("Store:StoreNotFound", $"Store with Id {storeId} was not found.");

            store.IsDeleted = true;
            await _storeRepository.UpdateAsync(store);
            return true;
        }
        catch (Exception ex)
        {
            return new Error("Store:Exception", ex.Message);
        }
    }

    public async Task<Result<bool>> DeletePermanentlyAsync(Guid storeId)
    {
        try
        {
            var store = await _storeRepository.GetByIdAsync(storeId);
            if (store is null)
                return new Error("Store:StoreNotFound", $"Store with Id {storeId} was not found.");

            await _storeRepository.DeleteAsync(store);
            return true;
        }
        catch (Exception ex)
        {
            return new Error("Store:Exception", ex.Message);
        }
    }
}
