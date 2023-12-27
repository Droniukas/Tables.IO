namespace tables_project_api.Models
{
    public class Dropdown
    {
        public int Id { get; set; }
        public int ColumnId { get; set; }
        public Column Column { get; set; }
        public ICollection<DropdownOption> Options { get; set; }
    }
}
