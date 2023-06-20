using ECommerce.Domain.Abstractions.Base;

namespace ECommerce.Domain.Entities
{
    public class BranchProduct : EntityBase<Guid>
    {
        public BranchProduct()
        {
            Id = Guid.NewGuid();
        }

        public int Amount { get; set; }

        public Guid BranchId { get; set; }
        public Branch? Branch { get; set; }

        public Guid ProductId { get; set; }
        public Product? Product { get; set; }
    }
}