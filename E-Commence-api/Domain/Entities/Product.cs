
using ECommerce.Domain.Abstractions.Base;

namespace ECommerce.Domain.Entities
{
    public class Product : EntityBase<Guid>
    {
        public Product()
        {
            Id = Guid.NewGuid();
        }

        public string Name { get; set; }
        public string Description { get; set; }
        public string Category { get; set; }

        public double Price { get; set; }

        public string Img { get; set; }

        public Guid StoreId { get; set; }
        public Store? Store { get; set; }

        public IList<BranchProduct>? BranchProducts { get; set; }
    }
}