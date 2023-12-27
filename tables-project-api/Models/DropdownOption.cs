namespace tables_project_api.Models
{
    public class DropdownOption
    {
        public int Id { get; set; }
        public string Value { get; set; }
        public Dropdown Dropdown { get; set; }
    }
}
