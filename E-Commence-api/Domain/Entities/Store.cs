using Domain.Abstractions.Interfaces;
using System.Xml.Linq;

namespace Domain.Entities;

public class Store : EntityBase<Guid>
{
    public Store()
    {
        Id = Guid.NewGuid();
    }

    public string? Name { get; set; }

    public int BranchesNumber => Branches?.ToList()?.Count() ?? 0;
    public int ProductsNumber => Products?.ToList()?.Count() ?? 0;

    public virtual IEnumerable<Product>? Products { get; set; }
    public virtual IEnumerable<Branch>? Branches { get; set; }
}