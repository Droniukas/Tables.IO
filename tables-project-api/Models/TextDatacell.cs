namespace tables_project_api.Models
{
    public class TextDatacell
    {
        public int Id { get; set; }
        public string Value { get; set; }
        public Row Row { get; set; }
        public Column? Column { get; set; }
    }
}
