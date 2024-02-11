namespace tables_project_api.Dtos
{
    public class TableRowReturnDto
    {
        public int Id { get; set; }
        public string Color { get; set; }
        public ICollection<TableDatacellReturnDto> Datacells { get; set; }
        public bool IsBottomRow { get; set; }
    }
}
