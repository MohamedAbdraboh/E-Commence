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
    public class StoresController : ControllerBase
    {
        private readonly IStoreService _storeService;

        public StoresController(IStoreService storeService) 
        { 
            _storeService = storeService;
        }

        [HttpGet]
        public async Task<Result<List<Store>>> Get()
        {
            return await _storeService.GetAllStoresAsync();
        }

        [HttpGet("{id}")]
        public async Task<Result<Store>> Get(string id)
        {
            return await _storeService.GetStoreAsync(new Guid(id));
        }

        [HttpPost]
        public async Task<Result<Store>> Post([FromBody] Store store)
        {
            return await _storeService.AddStoreAsync(store);
        }

        [HttpPut("{id}")]
        public async Task<Result<Store>> Put(string id, [FromBody] Store store)
        {
            return await _storeService.UpdateStoreAsync(new Guid(id), store);
        }

        [HttpDelete("{id}")]
        public async Task<Result<bool>> Delete(string id)
        {
            return await _storeService.DeleteStoreAsync(new Guid(id));
        }

        //[HttpDelete("{id}")]
        //public async Task<Result<bool>> Delete(string id)
        //{
        //    return await _storeService.DeletePermanentlyAsync(new Guid(id));
        //}
    }
}
