using tables_project_api.Models;

namespace tables_project_api.Interfaces
{
    public interface ITableRepository
    {
        Table? getTableByUserId(int userId);
        void UpdateDatacellValueById(int id, string newValue);
    }
}
