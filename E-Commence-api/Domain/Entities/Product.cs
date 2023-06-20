
using ECommerce.Domain.Abstractions.Base;

namespace ECommerce.Domain.Entities
{
    public class Product : EntityBase<Guid>
    {
        public Product()
        {
            Id = Guid.NewGuid();
        }

        public int Amount { get; set; }
        public double Price { get; set; }

        public Guid StoreId { get; set; }
        public Store? Store { get; set; }

        public IList<BranchProduct>? BranchProducts { get; set; }
    }
}