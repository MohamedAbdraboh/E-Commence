﻿using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System.Reflection;

//namespace Datalake.Management.EntityFrameworkCore.Core;
namespace Infrastructure.Abstractions;

public class StoreDbContext : Microsoft.EntityFrameworkCore.DbContext
{
    public DbSet<Store> Stores { get; set; } = default!;
    public DbSet<Product> Products { get; set; } = default!;
    public DbSet<Branch> Branches { get; set; } = default!;
    public DbSet<BranchProduct> branchProducts { get; set; } = default!;


    public StoreDbContext(DbContextOptions<StoreDbContext> options)
        : base(options)
    {
    }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        //optionsBuilder.UseLazyLoadingProxies();
        base.OnConfiguring(optionsBuilder);
    }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        builder.Entity<Store>().ToTable("ECommence.Stores");
        builder.Entity<Store>().HasKey(s => s.Id);
        builder.Entity<Store>().Property(s => s.Id).ValueGeneratedNever();
        builder.Entity<Store>().Property(s => s.Name).IsRequired().HasMaxLength(100);
        builder.Entity<Store>().HasMany(s => s.Branches).WithOne()
            .HasPrincipalKey(c => c.Id)
            .HasForeignKey("StoreId")
            .OnDelete(DeleteBehavior.Cascade)
            .IsRequired();
        builder.Entity<Store>().HasMany(c => c.Products).WithOne()
            .HasPrincipalKey(c => c.Id)
            .HasForeignKey("StoreId")
            .OnDelete(DeleteBehavior.Cascade)
            .IsRequired();

        builder.Entity<Branch>().ToTable("ECommence.Branches");
        builder.Entity<Branch>().HasKey(b => b.Id);
        builder.Entity<Branch>().Property(b => b.Id).ValueGeneratedNever();
        builder.Entity<Branch>().HasIndex(b => b.BranchNumber).IsUnique();
        builder.Entity<Branch>().Property(b => b.BranchNumber).IsRequired().HasMaxLength(100);

        builder.Entity<Product>().ToTable("ECommence.Products");
        builder.Entity<Product>().HasKey(b => b.Id);
        builder.Entity<Product>().Property(b => b.Id).ValueGeneratedNever();

        builder.Entity<BranchProduct>().ToTable("ECommence.BranchProducts");
        builder.Entity<BranchProduct>().HasKey(bp => bp.Id);
        builder.Entity<BranchProduct>().Property(bp => bp.Id).ValueGeneratedNever();
        builder.Entity<BranchProduct>().HasKey(bp => new { bp.BranchId, bp.ProductId });
        //builder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
    }
}
