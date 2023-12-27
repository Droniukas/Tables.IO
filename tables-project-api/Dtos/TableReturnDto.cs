namespace tables_project_api.Dtos
{
    public class TableReturnDto
    {
        public int Id { get; set; }
        public ICollection<ColumnReturnDto> Columns { get; set; }
        public ICollection<TableRowReturnDto> Rows { get; set; }
    }
}
