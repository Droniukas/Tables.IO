namespace tables_project_api.Models
{
    // we should use inheritance here
    public class DateDatacell
    {
        public int Id { get; set; }
        public DateTime Value { get; set; }
        public Row Row { get; set; }
        public Column? Column { get; set; }
    }
}
