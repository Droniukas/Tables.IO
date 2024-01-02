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
            return _context.Tables
                .Include(table => table.Columns)
                .ThenInclude(column => column.Datepicker)
                .Include(table => table.Columns).ThenInclude(column => column.Dropdown!.Options)
                .Include(table => table.Columns).ThenInclude(column => column.ColumnColorsValues!.ColorsValues)
                .Include(table => table.Columns).ThenInclude(column => column.ColumnIsBottomRowValue)
                .Include(table => table.Rows).ThenInclude(row => row.Datacells)
                .Where(table => table.UserId == userId).FirstOrDefault();
        }

        public void UpdateDatacellValueById(int id, string newValue)
        {
            Datacell? datacell = _context.Datacells.Find(id);
            if (datacell == null) { throw new Exception("Invalid datacell update Id"); }
            datacell.Value = newValue;
            _context.SaveChanges();
        }
    }
}
