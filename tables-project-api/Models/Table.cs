namespace tables_project_api.Models
{
    public class Table
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public ICollection<Column> Columns { get; set; }
        public ColumnColorsValues? ColumnColorsValues { get; set; }
        public ColumnIsBottomRowValue? ColumnIsBottomRowValue { get; set; }
        public ICollection<Row> Rows { get; set; }
    }
}
