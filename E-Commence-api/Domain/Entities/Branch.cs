using ECommerce.Domain.Abstractions.Base;
using System.ComponentModel.DataAnnotations.Schema;

namespace ECommerce.Domain.Entities
{
    public class Branch : EntityBase<Guid>
    {
        public Branch()
        {
            Id = Guid.NewGuid();
        }

        public string? Name { get; set; }
        public string? BranchNumber { get; set; }

        // should bulid more details entitty for Address
        public string? Address { get; set; }
        public int ProductsNumber => BranchProducts?.ToList()?.Count() ?? 0;

        public Guid StoreId { get; set; }
        public Store Store { get; set; }

        public IList<BranchProduct>? BranchProducts { get; set; }
    }
}