using ECommerce.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System.Reflection.Emit;

namespace Infrastructure.EntityConfigurations;
internal class BranchProductConfig : IEntityTypeConfiguration<BranchProduct>
{
    public void Configure(EntityTypeBuilder<BranchProduct> builder)
    {
        builder.ToTable("BranchProducts");
        builder.HasKey(bp => bp.Id);
        builder.Property(bp => bp.Id).ValueGeneratedNever();

        builder.HasKey(bp => new { bp.BranchId, bp.ProductId });

        builder.HasOne(bp => bp.Branch)
            .WithMany(b => b.BranchProducts)
            .HasForeignKey(bp => bp.BranchId)
            .OnDelete(DeleteBehavior.NoAction);

        builder.HasOne(bp => bp.Product)
            .WithMany(p => p.BranchProducts)
            .HasForeignKey(bp => bp.ProductId)
            .OnDelete(DeleteBehavior.NoAction);
    }
}
