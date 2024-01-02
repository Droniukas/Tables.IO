namespace tables_project_api.Dtos
{
    public class TableDatacellReturnDto
    {
        public int Id { get; set; }
        public string Value { get; set; }
        public bool? IsLastColumn { get; set; }
        public DropdownDto? Dropdown { get; set; }
        public DatepickerDto? Datepicker { get; set; }
    }
}
