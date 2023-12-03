namespace tables_project_api.Dtos
{
    public class JobApplicationRowReturnDto
    {
        public int Id { get; set; }
        public string Position { get; set; }
        public string Company { get; set; }
        public string Location { get; set; }
        public DateTime DateApplied { get; set; }
        public string Status { get; set; } // must be a custom Enum type
    }
}
