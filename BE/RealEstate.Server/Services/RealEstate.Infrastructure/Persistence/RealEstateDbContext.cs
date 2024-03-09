using InfrastructureBase.Persistence;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using RealEstate.Domain.Entities;
using RealEstate.Utils.ConstantVariables.Database;

namespace RealEstate.Infrastructure.Persistence
{
    public class RealEstateDbContext : ApplicationDbContext<User>
    {
        public RealEstateDbContext() : base()
        {

        }
        public RealEstateDbContext(DbContextOptions<RealEstateDbContext> options, IHttpContextAccessor httpContextAccessor) : base(options, httpContextAccessor)
        {
        }
        public override DbSet<User> Users { get; set; }
        public DbSet<Post> Posts { get; set; }
        public DbSet<PostType> PostTypes { get; set; }
        public DbSet<Favorite> Favorites { get; set; }
        public DbSet<Media> Medias { get; set; }
        public DbSet<UserIdentification> UserIdentification { get; set; }
        public DbSet<Wallet> Wallets { get; set; }
        public DbSet<Transaction> Transactions { get; set; }
        public DbSet<RealEstateType> RealEstateTypes { get; set; }
        public DbSet<BankAccount> BankAccounts { get; set; }
        public DbSet<Provinces> Provinces { get; set; }
        public DbSet<Districts> Districts { get; set; }
        public DbSet<Wards> Wards { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasDefaultSchema(DbSchemas.Default);
            modelBuilder.Entity<User>(e =>
            {
                e.HasKey(c => c.Id);
                e.HasMany(c => c.Favorites).WithOne(c => c.User).HasForeignKey(c => c.UserId).OnDelete(DeleteBehavior.Restrict); 
                e.HasMany(c => c.Posts).WithOne(c => c.User).HasForeignKey(c => c.UserId);
                e.HasMany(c => c.Wallets).WithOne(c => c.User).HasForeignKey(c => c.UserId);
                e.HasMany(c => c.UserIdentifications).WithOne(c => c.User).HasForeignKey(c => c.UserId);
                e.Property(c => c.Deleted).HasDefaultValue(false);
                e.HasMany(c => c.BankAccounts).WithOne(c => c.User).HasForeignKey(c => c.UserId);
            });

            modelBuilder.Entity<Wallet>(e =>
            {
                e.HasKey(c => c.Id);
                e.HasMany(c => c.Transactions).WithOne(c => c.Wallet).HasForeignKey(c => c.WalletID);
            });
            modelBuilder.Entity<Post>(e =>
            {
                e.HasKey(c => c.Id);
                e.HasMany(c => c.Favorites).WithOne(c => c.Post).HasForeignKey(c => c.PostId);
                e.HasMany(c => c.Medias).WithOne(c => c.Post).HasForeignKey(c => c.PostId);
                e.HasOne(c => c.PostType).WithMany(c => c.Posts).HasForeignKey(c => c.PostTypeId);
                e.HasOne(c => c.RealEstateType).WithMany(c => c.Posts).HasForeignKey(c => c.RealEstateTypeId);
                e.Property(c => c.Deleted).HasDefaultValue(false);
            });
            modelBuilder.Entity<PostType>(e =>
            {
                e.HasKey(c => c.Id);
                e.Property(c => c.Deleted).HasDefaultValue(false);
            });
            modelBuilder.Entity<RealEstateType>(e =>
            {
                e.HasKey(c => c.Id);
                e.Property(c => c.Deleted).HasDefaultValue(false);
            });
            modelBuilder.Entity<Transaction>(e =>
            {
                e.HasKey(c => c.Id);
            });
            modelBuilder.Entity<Media>(e =>
            {
                e.HasKey(c => c.Id);
                e.Property(c => c.Deleted).HasDefaultValue(false);
            });
            modelBuilder.Entity<UserIdentification>(e =>
            {
                e.HasKey(c => c.Id);
                e.Property(c => c.Deleted).HasDefaultValue(false);
            });
            modelBuilder.SeedData();
            base.OnModelCreating(modelBuilder);
        }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);
        }
    }
}
