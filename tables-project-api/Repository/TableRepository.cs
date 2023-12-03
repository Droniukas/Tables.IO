using Microsoft.EntityFrameworkCore;
using tables_project_api.Data;
using tables_project_api.Interfaces;
using tables_project_api.Models;

namespace tables_project_api.Repository
{
    public class TableRepository : ITableRepository
    {
        private readonly DataContext _context;

        public TableRepository(DataContext context)
        {
            this._context = context;
        }
        public Table? getTableByUserId(int userId)
        {
            return _context.Tables.Include(table => table.Columns).Include(table => table.Rows).Where(table => table.UserId == userId).FirstOrDefault();
        }
    }
}
