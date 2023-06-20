using ECommerce.Domain.Entities;
using ECommerce.Domain.Results;

namespace ECommerce.Application.Interfaces;
public interface IBranchService
{
    Task<Result<List<Branch>>> GetAllBranchsAsync();
    Task<Result<Branch>> GetBranchAsync(Guid branchId);
    Task<Result<Branch>> AddBranchAsync(Branch branch);
    Task<Result<Branch>> UpdateBranchAsync(Guid branchId, Branch branch);
    Task<Result<bool>> DeleteBranchAsync(Guid branchId);
    Task<Result<bool>> DeletePermanentlyAsync(Guid productId);
}
