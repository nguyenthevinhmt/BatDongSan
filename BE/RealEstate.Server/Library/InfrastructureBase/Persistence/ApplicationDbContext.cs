﻿using EntitiesBase.Entities;
using EntitiesBase.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace InfrastructureBase.Persistence
{
    public class ApplicationDbContext<TUser> : DbContext where TUser : class, IUser
    {
        protected readonly IHttpContextAccessor _httpContextAccessor;
        protected readonly int? UserId = null;

        public virtual DbSet<TUser> Users { get; set; }

        public ApplicationDbContext()
        {
        }

        public ApplicationDbContext(DbContextOptions options, IHttpContextAccessor httpContextAccessor)
            : base(options)
        {
            _httpContextAccessor = httpContextAccessor;
            var claims = _httpContextAccessor.HttpContext?.User?.Identity as ClaimsIdentity;
            var claim = claims?.FindFirst("user_id");
            if (claim != null && int.TryParse(claim.Value, out int userId))
            {
                UserId = userId;
            }
        }

        private void CheckAudit()
        {
            ChangeTracker.DetectChanges();
            var added = ChangeTracker.Entries()
                .Where(t => t.State == EntityState.Added)
                .Select(t => t.Entity)
                .AsParallel();

            added.ForAll(entity =>
            {
                if (entity is ICreatedBy createdEntity && createdEntity.CreatedBy == null)
                {
                    createdEntity.CreatedDate = DateTime.Now;
                    createdEntity.CreatedBy = UserId;
                }
            });

            var modified = ChangeTracker.Entries()
                        .Where(t => t.State == EntityState.Modified)
                        .Select(t => t.Entity)
                        .AsParallel();
            modified.ForAll(entity =>
            {
                if (entity is IModifiedBy modifiedEntity && modifiedEntity.ModifiedBy == null)
                {
                    modifiedEntity.ModifiedDate = DateTime.Now;
                    modifiedEntity.ModifiedBy = UserId;
                }
            });
        }

        public override int SaveChanges()
        {
            CheckAudit();
            return base.SaveChanges();
        }

        public override int SaveChanges(bool acceptAllChangesOnSuccess)
        {
            CheckAudit();
            return base.SaveChanges(acceptAllChangesOnSuccess);
        }

        public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
        {
            CheckAudit();
            return base.SaveChangesAsync(cancellationToken);
        }

        public override Task<int> SaveChangesAsync(bool acceptAllChangesOnSuccess, CancellationToken cancellationToken = default)
        {
            CheckAudit();
            return base.SaveChangesAsync(acceptAllChangesOnSuccess, cancellationToken);
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            var entityTypes = modelBuilder.Model.GetEntityTypes();
            foreach (var entity in entityTypes)
            {
                //var test = entity.ClrType;
                //var test3 = entity.ClrType.IsAssignableTo(typeof(ICreatedBy));
                if (entity.ClrType.IsAssignableTo(typeof(ICreatedBy)))
                {
                }
            }
            base.OnModelCreating(modelBuilder);
        }
    }
}
