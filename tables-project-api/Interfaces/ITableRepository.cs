using tables_project_api.Dtos;
using tables_project_api.Models;

namespace tables_project_api.Interfaces
{
    public interface ITableRepository
    {
        Table? GetTableByUserId(int userId);
        Row? GetRowByDatacellId(int datacellId);
        List<Column> GetColumnsByRowId(int rowId);
        List<Column> GetColumnsByTableId(int tableId);
        void UpdateDatacellValueById(int id, string newValue);
        Row AddRow(InputRowDto row);
        void RemoveRowById(int id);
    }
}
