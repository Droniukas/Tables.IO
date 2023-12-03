namespace tables_project_api.Models
{
    public class JobApplicationRow
    {
        // in the future we want tables to have date created/date modified fields
        public int Id { get; set; }
        public string Position { get; set; }
        public string Company { get; set; }
        public string Location { get; set; }
        public DateTime DateApplied { get; set; } // is generated in the frontend, must be a Date type
        public string Status { get; set; }
        public Table Table { get; set; }
    }
}
