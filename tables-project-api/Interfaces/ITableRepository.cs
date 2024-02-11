using tables_project_api.Models;

namespace tables_project_api.Interfaces
{
    public interface ITableRepository
    {
        Table? GetTableByUserId(int userId);
        Row? GetRowByDatacellId(int datacellId);
        ICollection<Column> GetColumnsByRowId(int rowId); 
        void UpdateDatacellValueById(int id, string newValue);
    }
}
