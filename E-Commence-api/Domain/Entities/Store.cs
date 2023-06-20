using ECommerce.Domain.Abstractions.Base;

namespace ECommerce.Domain.Entities;

public class Store : EntityBase<Guid>
{
    public Store()
    {
        Id = Guid.NewGuid();
    }

    public string? Name { get; set; }
    public string? Img { get; set; }
    public string? Category { get; set; }

    public int BranchesNumber => Branches?.ToList()?.Count() ?? 0;
    public int ProductsNumber => Products?.ToList()?.Count() ?? 0;

    public virtual IEnumerable<Product>? Products { get; set; }
    public virtual IEnumerable<Branch>? Branches { get; set; }
}