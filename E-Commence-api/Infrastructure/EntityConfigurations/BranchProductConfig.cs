using ECommerce.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.EntityConfigurations;
internal class BranchProductConfig : IEntityTypeConfiguration<BranchProduct>
{
    public void Configure(EntityTypeBuilder<BranchProduct> builder)
    {
        builder.ToTable("BranchProducts");
        builder.HasKey(bp => bp.Id);
        builder.Property(bp => bp.Id).ValueGeneratedNever();

        builder.HasKey(bp => new { bp.BranchId, bp.ProductId });
    }
}
