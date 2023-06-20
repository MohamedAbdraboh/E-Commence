﻿using ECommerce.Domain.Abstractions.Base;

namespace ECommerce.Domain.Entities
{
    public class BranchProduct : EntityBase<Guid>
    {
        public int BranchId { get; set; }
        public Branch? Branch { get; set; }

        public int ProductId { get; set; }
        public Product? Product { get; set; }
    }
}