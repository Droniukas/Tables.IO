namespace tables_project_api.Models
{
    public class Table
    {
        public int Id { get; set; }
        public int UserId { get; set; } // in the future will reference an User table
        public ICollection<Column> Columns { get; set; }
        public ICollection<JobApplicationRow> Rows { get; set; }
    }
}
