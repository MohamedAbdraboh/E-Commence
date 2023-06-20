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
    public class ProductsController : ControllerBase
    {
        private readonly IProductService _productService;

        public ProductsController(IProductService productService) 
        { 
            _productService = productService;
        }

        [HttpGet]
        public async Task<Result<List<Product>>> Get()
        {
            return await _productService.GetAllProductsAsync();
        }

        [HttpGet("{id}")]
        public async Task<Result<Product>> Get(string id)
        {
            return await _productService.GetProductAsync(new Guid(id));
        }

        [HttpPost]
        public async Task<Result<Product>> Post([FromBody] Product product)
        {
            return await _productService.AddProductAsync(product);
        }

        [HttpPut("{id}")]
        public async Task<Result<Product>> Put(string id, [FromBody] Product product)
        {
            return await _productService.UpdateProductAsync(new Guid(id), product);
        }

        [HttpDelete("{id}")]
        public async Task<Result<bool>> Delete(string id)
        {
            return await _productService.DeleteProductAsync(new Guid(id));
        }

        //[HttpDelete("{id}")]
        //public async Task<Result<bool>> Delete(string id)
        //{
        //    return await _productService.DeletePermanentlyAsync(new Guid(id));
        //}
    }
}
