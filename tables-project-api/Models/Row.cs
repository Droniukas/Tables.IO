namespace tables_project_api.Models
{
    public class Row
    {
        // in the future we want tables to have date created/date modified fields
        public int Id { get; set; }
        public Table Table { get; set; }
        public ICollection<Datacell> Datacells { get; set; }
    }
}
