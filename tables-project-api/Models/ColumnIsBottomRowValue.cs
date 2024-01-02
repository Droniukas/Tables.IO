namespace tables_project_api.Models
{
    public class ColumnIsBottomRowValue
    {
        public int Id { get; set; }
        public string Value { get; set; }
        public int ColumnId { get; set; }
        public Column Column { get; set; }
    }
}