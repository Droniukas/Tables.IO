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
        public DbSet<Row> Rows { get; set; }
        public DbSet<Column> Columns { get; set; }
        public DbSet<TextDatacell> TextDatacells { get; set; }
        public DbSet<DateDatacell> DateDatacells { get; set; }
        public DbSet<DropdownOption> DropdownOptions { get; set; }
        public DbSet<Dropdown> Dropdowns { get; set; }
        public DbSet<Datepicker> Datepickers { get; set; }
        public DbSet<ColumnColorsValues> ColumnColorsValues { get; set; }
        public DbSet<ColumnIsBottomRowValue> ColumnIsBottomRowValues { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Column>()
                .HasOne(column => column.Datepicker)
                .WithOne(datepicker => datepicker.Column)
                .HasForeignKey<Datepicker>(datepicker => datepicker.ColumnId)
                .IsRequired();

            modelBuilder.Entity<Column>()
                .HasOne(column => column.Dropdown)
                .WithOne(dropdown => dropdown.Column)
                .HasForeignKey<Dropdown>(dropdown => dropdown.ColumnId)
                .IsRequired();

            //modelBuilder.Entity<Table>()
            //    .HasOne(table => table.ColumnColorsValues)
            //    .WithOne(columnColorsValues => columnColorsValues.Table)
            //    .HasForeignKey<ColumnColorsValues>(columnColorsValues => columnColorsValues.TableId)
            //    .IsRequired();
        }
    }
}
