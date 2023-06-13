using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.EntityConfigurations;

internal class StoreConfig : IEntityTypeConfiguration<Store>
{
    public void Configure(EntityTypeBuilder<Store> builder)
    {
        builder.ToTable("ECommence.Stores");
        builder.HasKey(s => s.Id);
        builder.Property(s => s.Id).ValueGeneratedNever();
        builder.Property(s => s.Name).IsRequired().HasMaxLength(100);

        builder.HasMany(s => s.Branches).WithOne()
            .HasPrincipalKey(c => c.Id)
            .HasForeignKey("StoreId")
            .OnDelete(DeleteBehavior.Cascade)
            .IsRequired();

        builder.HasMany(c => c.Products).WithOne()
            .HasPrincipalKey(c => c.Id)
            .HasForeignKey("StoreId")
            .OnDelete(DeleteBehavior.Cascade)
            .IsRequired();

    }
}
