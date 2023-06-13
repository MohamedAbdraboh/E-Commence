using Domain.Abstractions.Interfaces;
namespace Domain.Entities
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