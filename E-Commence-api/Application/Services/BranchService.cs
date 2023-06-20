using ECommerce.Application.Interfaces;
using ECommerce.Domain.Entities;
using ECommerce.Domain.Interfaces;
using ECommerce.Domain.Results;

namespace ECommerce.Application.Services;
public class BranchService : IBranchService
{
    private readonly IBranchRepository _branchRepository;

    public BranchService(IBranchRepository branchRepository)
    {
        _branchRepository = branchRepository;
    }

    public async Task<Result<Branch>> GetBranchAsync(Guid branchId)
    {
        try
        {
            var branch = await _branchRepository.GetByIdAsync(branchId);
            if (branch is null)
                return new Error("Branch:BranchNotFound", $"Branch with Id {branchId} was not found.");

            return branch;
        }
        catch (Exception ex)
        {
            return new Error("Branch:Exception", ex.Message);
        }
    }

    public async Task<Result<List<Branch>>> GetAllBranchsAsync()
    {
        try
        {
            return await _branchRepository.ListAsync();
        }
        catch (Exception ex)
        {
            return new Error("Branch:Exception", ex.Message);
        }
    }

    public async Task<Result<Branch>> AddBranchAsync(Branch branch)
    {
        try
        {
            await _branchRepository.AddAsync(branch);
            return branch;
        }
        catch (Exception ex)
        {
            return new Error("Branch:Exception", ex.Message);
        }
    }

    public async Task<Result<Branch>> UpdateBranchAsync(Guid branchId, Branch branch)
    {
        try
        {
            var existingBranch = await _branchRepository.GetByIdAsync(branchId);
            if (existingBranch is null)
                return new Error("Branch:BranchNotFound", $"Branch with Id {branchId} was not found.");

            existingBranch.Name = branch.Name;
            existingBranch.BranchProducts = branch.BranchProducts;
            existingBranch.Address = branch.Address;
            existingBranch.UpdatedAt = DateTimeOffset.UtcNow;

            await _branchRepository.UpdateAsync(existingBranch);
            return existingBranch;
        }
        catch (Exception ex)
        {
            return new Error("Branch:Exception", ex.Message);
        }
    }

    public async Task<Result<bool>> DeleteBranchAsync(Guid branchId)
    {
        try
        {
            var Branch = await _branchRepository.GetByIdAsync(branchId);
            if (Branch is null)
                return new Error("Branch:BranchNotFound", $"Branch with Id {branchId} was not found.");

            Branch.IsDeleted = true;
            await _branchRepository.UpdateAsync(Branch);
            return true;
        }
        catch (Exception ex)
        {
            return new Error("Branch:Exception", ex.Message);
        }
    }

    public async Task<Result<bool>> DeletePermanentlyAsync(Guid branchId)
    {
        try
        {
            var Branch = await _branchRepository.GetByIdAsync(branchId);
            if (Branch is null)
                return new Error("Branch:BranchNotFound", $"Branch with Id {branchId} was not found.");

            await _branchRepository.DeleteAsync(Branch);
            return true;
        }
        catch (Exception ex)
        {
            return new Error("Branch:Exception", ex.Message);
        }
    }
}
