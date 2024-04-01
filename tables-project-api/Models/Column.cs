namespace tables_project_api.Models
{
    public class Column
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public Datepicker? Datepicker { get; set; }
        public Dropdown? Dropdown { get; set; }
        public ColumnColorsValues? ColumnColorsValues { get; set; }
        public ColumnIsBottomRowValue? ColumnIsBottomRowValue { get; set; }
        public Table Table { get; set; }
        public int TableId { get; set; }
    }
}
