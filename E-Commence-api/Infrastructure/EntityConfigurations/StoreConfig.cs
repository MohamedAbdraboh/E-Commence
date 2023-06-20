using ECommerce.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.EntityConfigurations;

internal class StoreConfig : IEntityTypeConfiguration<Store>
{
    public void Configure(EntityTypeBuilder<Store> builder)
    {
        builder.ToTable("Stores");
        builder.HasKey(s => s.Id);
        builder.Property(s => s.Id).ValueGeneratedNever();
        builder.Property(s => s.Name).IsRequired().HasMaxLength(100);

        builder.HasMany<Branch>(g => g.Branches)
                .WithOne(s => s.Store)
                .HasForeignKey(s => s.StoreId);

        builder.HasMany<Product>(g => g.Products)
                .WithOne(s => s.Store)
                .HasForeignKey(s => s.StoreId);
    }
}
