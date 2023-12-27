namespace tables_project_api.Models
{
    public class Datepicker
    {
        public int Id { get; set; }
        public int ColumnId { get; set; }
        public Column Column { get; set; }
    }
}
