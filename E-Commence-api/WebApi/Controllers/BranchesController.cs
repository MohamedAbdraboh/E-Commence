using ECommerce.Application.Interfaces;
using ECommerce.Domain.Entities;
using ECommerce.Domain.Interfaces;
using ECommerce.Domain.Results;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BranchesController : ControllerBase
    {
        private readonly IBranchService _branchService;

        public BranchesController(IBranchService branchService) 
        { 
            _branchService = branchService;
        }

        [HttpGet]
        public async Task<Result<List<Branch>>> Get()
        {
            return await _branchService.GetAllBranchsAsync();
        }

        [HttpGet("{id}")]
        public async Task<Result<Branch>> Get(string id)
        {
            return await _branchService.GetBranchAsync(new Guid(id));
        }

        [HttpPost]
        public async Task<Result<Branch>> Post([FromBody] Branch branch)
        {
            return await _branchService.AddBranchAsync(branch);
        }

        [HttpPut("{id}")]
        public async Task<Result<Branch>> Put(string id, [FromBody] Branch branch)
        {
            return await _branchService.UpdateBranchAsync(new Guid(id), branch);
        }

        [HttpDelete("{id}")]
        public async Task<Result<bool>> Delete(string id)
        {
            return await _branchService.DeleteBranchAsync(new Guid(id));
        }

        //[HttpDelete("{id}")]
        //public async Task<Result<bool>> Delete(string id)
        //{
        //    return await _branchService.DeletePermanentlyAsync(new Guid(id));
        //}
    }
}
