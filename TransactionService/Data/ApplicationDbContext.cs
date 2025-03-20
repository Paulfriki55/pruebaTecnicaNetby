using Microsoft.EntityFrameworkCore;
using TransactionService.Models;

namespace TransactionService.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<Transaction> Transactions { get; set; }
        public DbSet<Product> Products { get; set; }
    }
}
