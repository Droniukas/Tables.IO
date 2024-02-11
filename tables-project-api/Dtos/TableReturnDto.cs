namespace tables_project_api.Dtos
{
    public class TableReturnDto
    {
        public int Id { get; set; }
        public IEnumerable<ColumnReturnDto> Columns { get; set; }
        public IEnumerable<TableRowReturnDto> Rows { get; set; }
    }
}
