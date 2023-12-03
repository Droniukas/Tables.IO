using Microsoft.EntityFrameworkCore;
using tables_project_api.Models;

namespace tables_project_api.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {

        }



        public DbSet<Table> Tables { get; set; }
        public DbSet<JobApplicationRow> JobApplicationRows { get; set; }
        public DbSet<Column> Columns { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Table>()
                .HasMany(table => table.Columns);
            modelBuilder.Entity<Column>()
                .HasOne(column => column.Table);
        }
    }
}
